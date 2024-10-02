'use strict';
const mysql2 = require('mysql2/promise');

//const db = mysql.createPool({
// const msql2db = await mysql2.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });


// module.exports = msql2db;

 
// msql2db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


const msql2db = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = msql2db;
