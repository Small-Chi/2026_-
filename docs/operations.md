# 部署與維運

## 本機預覽

網站沒有建置步驟。可直接以瀏覽器開啟 `index.html`；部署後的正式環境為：

- https://small-chi.github.io/2026_-/

本機驗證時，表單仍會送到正式 Apps Script endpoint，避免使用實際報名資料做測試。測試完成後，請確認試算表中的測試列是否需要移除。

## Apps Script

正式專案：

- https://script.google.com/home/projects/1U7WscVamRuK8360ZT_v2Fyj8opt0sQkw_A0FVZqkW_iv3PQiH1v3eovU/edit
- Web App endpoint：`app.js` 中的 `SCRIPT_URL`。

更新步驟：

1. 在 Apps Script 編輯器更新 `Code.gs`，儲存並確認函式清單可辨識 `doGet`、`doPost` 等函式。
2. 若變更欄位或初始化行為，先執行 `getOrCreateSheet`，確認試算表與標題列正確。
3. 選「部署」>「管理部署作業」>「編輯」，版本選「建立新版本」，保留執行身分為本人、存取權為所有人，再按「部署」。
4. 確認部署完成且 Web App endpoint 未改變。若改成新部署並產生新 URL，需同步更新 `app.js` 的 `SCRIPT_URL`。
5. 從網站送出一筆測試報名，確認 Apps Script 執行記錄及 Google 試算表列資料。

若首次執行 Apps Script 函式或更新部署出現 Google 授權畫面，需由專案擁有者在瀏覽器檢查權限並完成授權。

## GitHub Pages

- GitHub repo：`Small-Chi/2026_-`。
- 發佈來源：`main` 分支根目錄 `/`。
- Pages 網址：https://small-chi.github.io/2026_-/

修改前先確認工作目錄與 Git 狀態。只加入網站、Apps Script 與文件檔案，避免提交 `spec/`：

```powershell
git status --short
git add index.html styles.css app.js Code.gs cover2.jpg README.md docs/
git commit -m "Describe the maintenance change"
git push origin main
```

推送後可在 GitHub repository 的 Settings > Pages 查看發佈狀態，或以已登入的 GitHub CLI 檢查：

```powershell
gh api repos/Small-Chi/2026_-/pages/builds --jq '.[0] | {status,created_at,error}'
```

新啟用或剛更新 Pages 時，短時間內出現 404 可能只是建置尚未完成；先確認 build 狀態及錯誤訊息。

## 驗收清單

- 瀏覽器開啟 Pages 網址，確認標題、橫幅、六個行程項目及五個表單欄位載入。
- 桌機確認三列配置；手機確認活動內容與表單堆疊且無水平溢出。
- 測試必填姓名、Email、電話；單位與職稱可留空。
- 使用含前導零的電話測試，例如 `0012345678`，確認試算表 D 欄仍顯示完整字串。
- 在試算表選取電話儲存格，於數字格式選單確認「純文字」已選取。
- 確認標題列與提交資料順序為姓名、Email、單位、電話、職稱。
- 確認 GitHub Pages build 狀態為 `built`，且 repository 中沒有 `spec/`。

## 常見問題

| 現象 | 排查方式 |
| --- | --- |
| 前端顯示成功，但試算表沒有新列 | `no-cors` 無法讀取 Apps Script 回應；檢查 Apps Script 執行記錄、部署版本、存取權及 `SCRIPT_URL`。 |
| 電話前導零消失或格式為自動 | 在 Apps Script 確認先寫入列、再對該筆 D 欄儲存格執行 `setNumberFormat("@")`；重新部署後再測試。必要時執行 `getOrCreateSheet` 對整欄重新套用純文字。 |
| Apps Script 回報找不到試算表 | 確認名稱為 `2026_公司旅遊`，並確認 `DriveApp.searchFiles` 的 MIME 類型條件只搜尋 Google 試算表。 |
| Apps Script 執行逾時或同時送出錯誤 | 查看 Apps Script 執行記錄；`doPost` 使用 10 秒 script lock，若等待超時需檢查並行執行狀態。 |
| Pages 顯示 404 | 確認 repo Pages 來源為 `main` / 根目錄，等待建置完成，再確認 URL 使用 `2026_-` slug。 |

## 目前驗收資料

試算表保留兩筆 Pages 表單測試資料，用來驗證公開網站到 Apps Script 的寫入流程。正式收集報名資料前，可在確認測試結果後刪除這兩列；不要刪除標題列。