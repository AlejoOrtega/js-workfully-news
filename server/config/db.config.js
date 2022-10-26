// 'use strict';
const mysql = require("mysql2");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "db4free.net",
  user: "joaomaguimaraes",
  password: "joaomaguimaraes",
  database: "workfully_db",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = dbConn;
