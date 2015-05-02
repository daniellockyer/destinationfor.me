var fs = require("fs");
var file = "production.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.each("SELECT * FROM courses", function(err, row) {
    console.log(row);
});