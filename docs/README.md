# 系統文件

本目錄說明「2026 宇宙科技公司員工旅遊」報名網站的架構、資料流程與日常維護方式。

## 文件索引

- [系統架構](architecture.md)：頁面分層、前後端責任、報名資料契約與 Google Sheet 結構。
- [部署與維運](operations.md)：本機預覽、Apps Script 更新、GitHub Pages 發佈、驗收與故障排除。

## 目前正式環境

- 網站：https://small-chi.github.io/2026_-/
- GitHub repository：https://github.com/Small-Chi/2026_-
- Apps Script 專案：https://script.google.com/home/projects/1U7WscVamRuK8360ZT_v2Fyj8opt0sQkw_A0FVZqkW_iv3PQiH1v3eovU/edit
- Google 試算表：`2026_公司旅遊`

GitHub repository 使用 `2026_-` 作為名稱；GitHub CLI 建立中文名稱時會正規化 repo slug。Pages 網址與 repo slug 因此使用 `2026_-`。

> `spec/` 保存原始需求，不應加入 GitHub repository。