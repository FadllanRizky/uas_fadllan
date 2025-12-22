const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_mbur"
});

db.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
  } else {
    console.log("Database Connected!");
  }
});

module.exports = db;


// Untuk Connect ke Database
