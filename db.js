var fs = require("fs");
var file = "production.db";
fs.unlinkSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


db.serialize(function() {
    db.run("CREATE TABLE universities (ID INT, TITLE TEXT, WIKIPEDIA TEXT, LOGO TEXT, WEBSITE TEXT, BACKGROUND TEXT);");
    db.run("CREATE TABLE jobs (ID INT, TITLE TEXT);");
    db.run("CREATE TABLE courses (ID INT, TITLE TEXT);");
    db.run("CREATE TABLE jobslist (USERID INT, JOBID INT, COMPANYID INT);");
    db.run("CREATE TABLE userCourses (USERID INT, COURSEID INT, UNIID INT);");
    db.run("CREATE TABLE userUni (USERID INT, UNIID INT);");
    db.run("CREATE TABLE users (USERID INT, AGE INT);");
    db.run("CREATE TABLE companies (COMPANYID INT, NAME TEXT);");

    /*fs.readFile('data/unis.txt', 'utf8', function (err,data) {
		if (err) return console.log(err);
	  	var lines = data.split("\n");

	  	for(i in lines) {
	  		var line = lines[i];

//	  		db.run("INSERT INTO COMPANY (NAME,AGE,ADDRESS,SALARY) VALUES ( 'Kim', 22, 'South-Hall', 45000.00 );");
	  	}
	});*/
});