var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./routes.js')(express, app);
app.listen(80);