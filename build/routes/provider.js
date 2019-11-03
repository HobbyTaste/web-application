"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var render_1 = require("../utils/render");
var providerRouter = express_1.Router();
providerRouter.get('/', function (req, res) {
    res.redirect('cabinet');
});
providerRouter.get('/cabinet', function (req, res) {
    res.end(render_1.getTemplate());
});
exports.default = providerRouter;
