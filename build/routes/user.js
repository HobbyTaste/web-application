"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var render_1 = require("../utils/render");
var userRouter = express_1.Router();
userRouter.get('/', function (req, res) {
    res.redirect('cabinet');
});
userRouter.get('/cabinet', function (req, res) {
    res.end(render_1.getTemplate());
});
exports.default = userRouter;
