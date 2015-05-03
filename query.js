var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("production.db");

db.each("SELECT * FROM courses", function(err, row) {
    console.log(row);
});