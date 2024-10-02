'use strict';
const mysql = require("mysql");

//const db = mysql.createPool({
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = db;

 
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});