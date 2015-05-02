var fs = require("fs");
var file = "production.db";
fs.unlinkSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
    db.run("CREATE TABLE universities (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, wikipedia TEXT, logo TEXT, website TEXT, background TEXT);");
    db.run("CREATE TABLE jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);");
    db.run("CREATE TABLE courses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);");
    db.run("CREATE TABLE jobslist (userid INT, jobid INT, companyid INT);");
    db.run("CREATE TABLE userCourses (userid INT, courseid INT, uniid INT);");
    db.run("CREATE TABLE userUni (userid INT, uniid INT);");
    db.run("CREATE TABLE users (userid INTEGER PRIMARY KEY AUTOINCREMENT, age INT);");
    db.run("CREATE TABLE companies (companyid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");

    fs.readFile('data/courses.txt', 'utf8', function (err,data) {
		if (err) return console.log(err);
	  	var lines = data.split("\n");

	  	for(i in lines) {
	  		var line = lines[i];

	  		db.run("INSERT INTO courses (title) VALUES (\""+line+"\");");
	  	}
	});
});

/*db.each("SELECT * FROM courses", function(err, row) {
    console.log(row);
});*/