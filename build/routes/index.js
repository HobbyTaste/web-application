"use strict";
var path = require('path');
var fs = require('fs');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.setHeader('Content-type', 'text/html');
        res.send(fs.readFileSync(path.resolve(__dirname, '../../index.html')));
    });
    return app;
};
