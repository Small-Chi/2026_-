const SPREADSHEET_NAME = "2026_公司旅遊";
const HEADERS = ["姓名", "Email", "單位", "電話", "職稱"];

function doGet() {
  return ContentService.createTextOutput("報名服務運作中");
}

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};
  const required = ["name", "email", "phone"];

  if (required.some((key) => !String(data[key] || "").trim())) {
    return jsonResponse({ ok: false, message: "缺少必填欄位" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateSheet();
    const row = [
      String(data.name).trim(),
      String(data.email).trim(),
      String(data.department || "").trim(),
      String(data.phone).trim(),
      String(data.title || "").trim(),
    ];
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    sheet.getRange(nextRow, 4).setNumberFormat("@");
    return jsonResponse({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet() {
  const files = DriveApp.searchFiles(
     `title = '${SPREADSHEET_NAME}' and mimeType = 'application/vnd.google-apps.spreadsheet'`
  );
  const spreadsheet = files.hasNext()
    ? SpreadsheetApp.open(files.next())
    : SpreadsheetApp.create(SPREADSHEET_NAME);
  const sheet = spreadsheet.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  sheet.getRange("D:D").setNumberFormat("@");
  return sheet;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}