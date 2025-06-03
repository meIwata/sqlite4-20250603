var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sqlite3 = require('sqlite3').verbose();
var dbPath = path.join(__dirname, 'db', 'sqlite.db');
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('無法開啟資料庫:', err.message);
  } else {
    console.log('成功連接到資料庫');
  }
});

// 查詢所有電影台詞
app.get('/api/quotes', (req, res) => {
  db.all('SELECT * FROM movie_quotes', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// 根據 provider 查詢
app.get('/api', (req, res) => {
  const provider = req.query.provider;
  if (!provider) {
    return res.status(400).json({ error: '缺少 provider 參數' });
  }
  db.all('SELECT * FROM movie_quotes WHERE provider = ?', [provider], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
