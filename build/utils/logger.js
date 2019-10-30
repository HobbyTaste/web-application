"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var log4js_1 = __importDefault(require("log4js"));
var logger = log4js_1.default.getLogger();
logger.level = 'debug';
exports.default = logger;
