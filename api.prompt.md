1. 在 app.js 中，使用 sqlite3 來操作資料庫，並開啟位置在 db/sqlite.db 的資料庫，需要確認是否成功打開資料庫。不要用匯入 db.js的方式。
2. 在 app.js 中，用 get 方法，撰寫 /api/quotes 路由，使用 SQL 來查詢 movie_quotes table 所有的電影台詞資料，回傳 json 格式的資料。
3. 在 app.js 中，撰寫 get /api?provider= 路由，使用 SQLite 查詢 movie_quotes 中，某 provider 提供的所有資料