const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweixrElGlWeykp1API3eeKc69LldvmvIDYNnT3BAA6lyub3o8jCZFA7NZ-uFO2zWl2TQ/exec";

const form = document.querySelector("#registration-form");
const submitButton = form.querySelector("button[type='submit']");
const statusMessage = document.querySelector("#form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.removeAttribute("data-state");

  if (!form.reportValidity()) return;
  if (!SCRIPT_URL.startsWith("https://script.google.com/")) {
    statusMessage.textContent = "報名系統尚未完成設定，請稍後再試。";
    statusMessage.dataset.state = "error";
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "送出中…";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(new FormData(form)),
    });
    form.reset();
    statusMessage.textContent = "報名資料已送出，期待活動當天見！";
  } catch {
    statusMessage.textContent = "送出失敗，請確認網路連線後再試一次。";
    statusMessage.dataset.state = "error";
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "送出報名";
  }
});