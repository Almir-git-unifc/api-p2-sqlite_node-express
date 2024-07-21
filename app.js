var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouterV1 = require('./routes/apiRouterV1');
var apiRouterV2 = require('./routes/apiRouterV2');


var app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', apiRouterV1);
app.use('/api/v2', apiRouterV2);


module.exports = app;
