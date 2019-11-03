"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var render_1 = require("../utils/render");
var indexRouter = express_1.Router();
indexRouter.get('/', function (req, res) {
    res.end(render_1.getTemplate());
});
exports.default = indexRouter;
