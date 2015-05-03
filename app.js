var express = require('express');
var app = express();
var cors = require('cors');
var router = express.Router();
var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("production.db");
var sets = require('simplesets');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

router.get('/', function(req, res) { 
	var jobs = [];

	db.serialize(function() {
		db.each("SELECT * FROM jobs", function(err, row) {
	    	jobs.push(row);
		}, function() { res.render('home', { data: jobs }); });
	});
});
router.get('/uni', function(req, res) { 
	var unis = [];

	db.serialize(function() {
		db.each("SELECT * FROM universities", function(err, row) {
	    	unis.push(row);
		}, function() { res.render('unilist', { data: unis }); });
	});
});
router.get('/uni/:id', function(req, res) { 
	db.serialize(function() {
		db.each("SELECT * FROM universities WHERE id="+req.params.id, function(err, uni) {
	    	res.render('uni', { data: uni }); 
		});
	});
});
router.get('/tables/:name', function(req, res) { 
	var senduni;

	db.serialize(function() {
		db.each("SELECT * FROM jobs WHERE id="+req.params.name, function(err, job) {
			senduni=job;		
			senduni.pre = (/[aeiouAEIOU]/.test(job.title)) ? "an" : "a";
		}, function() {
			var count = 0;
			db.each("SELECT * FROM universities ORDER BY RANDOM() LIMIT 10;", function(err, uni) {
				senduni['table'+count] = (count + 1)+","+ (10-count)+",\""+ uni.title+"\","+ (120000-10000*count)+",\"&#8594;\"";
				count++;
			}, function() {
				res.render('tables', {data : senduni});
			});
		});
	});
});  
router.get('/people/:num', function(req, res) { 
	var sendjob;

	db.serialize(function() {
		db.each("SELECT * FROM jobs WHERE id="+req.params.num, function(err, job) {		
			sendjob = job;
			sendjob.pre = (/[aeiouAEIOU]/.test(job.title)) ? "an" : "a";
		}, function() {
			db.each("SELECT * FROM companies ORDER BY RANDOM() LIMIT 1;", function(err, company) {		
				sendjob.sponsor = company;
			}, function() {
				res.render('people', {data : sendjob}); 
			});
		});
	});
});
router.get('/contribute', function(req, res) { res.render('contribute'); }); 
router.get('/contribute/linkedin', function(req, res) { res.render('linkedin'); }); 
router.get('/contribute/cv', function(req, res) { res.render('cv'); }); 
router.get('/contribute/form', function(req, res) { res.render('form'); });  
router.get('/find', function(req, res) { res.render('find'); });  
router.post('/postcv', function(req, res) {
	var contentArray = req.body.data;
	var myCourses = new sets.Set();
	var myUniversities = new sets.Set();
	var myJobs = new sets.Set();

	contentArray = contentArray.replace(/[\n\r]/gm, " ");
	
	db.serialize(function() {
		db.each("SELECT * FROM courses", function(err, row) {
			var patt = new RegExp("\\s" + row.title + "[\\s,.:;!?]", "g");
			if (patt.test(contentArray)) myCourses.add(row.title);
		}, function() {

			db.each("SELECT * FROM universities", function(err, row) {
				var patt = new RegExp("\\s" + row.title + "[\\s,.:;!?]", "g");
				if (patt.test(contentArray)) myUniversities.add(row.title);
			}, function() {

				db.each("SELECT * FROM jobs", function(err, row) {
					var patt = new RegExp("\\s" + row.title + "[\\s,.:;!?]", "g");
					if (patt.test(contentArray)) myJobs.add(row.title);
				}, function() {

					res.send({courses: myCourses.array(), uni: myUniversities.array(), jobs: myJobs.array()});
				});
			});
		});	
	});
});
router.post('/postli', function(req, res) {

});

app.use(router);
app.listen(80);