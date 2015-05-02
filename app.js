var express = require('express');
var app = express();
var cors = require('cors');
var router = express.Router();
var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("production.db");

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

router.get('/', function(req, res) { 
	var jobs = [];

	db.serialize(function() {
		db.each("SELECT * FROM jobs", function(err, row) {
	    	jobs.push(row.title);
		}, function() {
			res.render('home', { data: jobs }); 
		});
	});
});
router.get('/uni', function(req, res) { 
	var unis = [];

	db.serialize(function() {
		db.each("SELECT * FROM universities", function(err, row) {
	    	unis.push(row);
		}, function() {
			res.render('unilist', { data: unis }); 
		});
	});
});
router.get('/uni/:id', function(req, res) { 
	db.serialize(function() {
		db.each("SELECT * FROM universities WHERE id="+req.params.id, function(err, uni) {
	    	res.render('uni', { data: uni }); 
		});
	});
});
router.get('/people', function(req, res) { res.render('people'); });
router.get('/add', function(req, res) { res.render('add'); });  
router.get('/tables', function(req, res) { res.render('tables'); });  
router.get('/find', function(req, res) { res.render('find'); });  

app.use(router);
app.listen(80);