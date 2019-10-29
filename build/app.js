"use strict";
var express = require('express');
var path = require('path');
var withRoutes = require('./routes');
var morgan = require('morgan');
var app = express();
app.use('/dist', express.static('dist'));
app.use('/public/images', express.static('images'));
app.listen(process.env.PORT || 3000);
