# 2026 宇宙科技公司員工旅遊

員工活動報名網站。

GitHub Pages：https://small-chi.github.io/2026_-/

GitHub repo：https://github.com/Small-Chi/2026_-

維護文件：[系統文件索引](docs/README.md)

## Google 試算表

1. 在 Apps Script 建立新專案，將 `Code.gs` 貼入編輯器並儲存。
2. 執行 `getOrCreateSheet` 一次，完成 Google 試算表建立與授權。試算表名稱為 `2026_公司旅遊`。
3. 選擇「部署」>「新增部署作業」>「網頁應用程式」，執行身分選「我」，存取權選「所有人」，完成授權並部署。
4. 複製網頁應用程式網址，填入 `app.js` 的 `SCRIPT_URL`。

Apps Script 會建立「姓名、Email、單位、電話、職稱」標題列，並將電話欄設定為純文字格式。

## GitHub Pages

只需發佈網站檔案與 `Code.gs`；不要將 `spec/` 推送到 GitHub。