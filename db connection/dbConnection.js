const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Jakkoju@1993",
  database: "career_bridge",
});

module.exports = pool;
