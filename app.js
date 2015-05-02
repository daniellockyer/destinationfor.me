var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

var router = express.Router();

router.get('/', function(req, res) {
res.render('home');
});

router.get('/uni/:id', function(req, res) {
res.render('uni', { id: req.params.id });
});

router.get('/people', function(req, res) {
	res.render('people');
});

router.get('/add', function(req, res) {
res.render('add');
});  

app.use(router);

app.listen(80);