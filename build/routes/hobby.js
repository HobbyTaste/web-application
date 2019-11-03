"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lodash_1 = require("lodash");
var render_1 = require("../utils/render");
var hobby_1 = __importDefault(require("../models/hobby"));
var logger_1 = __importDefault(require("../utils/logger"));
var hobbyRouter = express_1.Router();
hobbyRouter.get('/', function (req, res) {
    res.redirect('new');
});
hobbyRouter.get('/new', function (req, res) {
    res.end(render_1.getTemplate());
});
hobbyRouter.post('/add', function (req, res) {
    var _a = req.body, label = _a.label, phoneNumber = _a.phoneNumber, address = _a.address, metroStation = _a.metroStation, description = _a.description, shortDescription = _a.shortDescription;
    var hobby = new hobby_1.default({
        label: label,
        value: label,
        phoneNumber: phoneNumber,
        address: address,
        metroStation: metroStation,
        description: description,
        shortDescription: shortDescription,
    });
    hobby.save()
        .then(function (data) { return logger_1.default.info("Data was saved to Users model: " + data); })
        .catch(function (error) { return logger_1.default.error("An error occurred during saving data to model: " + error); });
    res.end();
});
hobbyRouter.get('/find', function (req, res) {
    var _a = req.query, startsWith = _a.startsWith, label = _a.label, contains = _a.contains;
    var query;
    if (!lodash_1.isNil(label)) {
        query = hobby_1.default.find({ value: label.toLowerCase() });
    }
    else if (!lodash_1.isNil(contains)) {
        query = hobby_1.default.find({ value: RegExp("" + contains.toLowerCase()) });
    }
    else if (!lodash_1.isNil(startsWith)) {
        query = hobby_1.default.find({ value: RegExp("^" + startsWith.toLowerCase()) });
    }
    else {
        res.status(404).end('Check your query params');
        return;
    }
    query
        .exec()
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (error) {
        res.status(500).end();
        logger_1.default.error("An error occurred during finding data in model: " + error);
    });
});
exports.default = hobbyRouter;
