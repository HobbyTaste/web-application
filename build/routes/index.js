"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var indexRouter = express_1.default.Router();
var TITLE = 'Hobby taste';
function getHeader() {
    return ("\n        <head>\n            <meta charset=\"UTF-8\">\n            <link href=\"public/images/favicon.ico\" rel=\"icon\">\n            <meta name=\"viewport\" content=\"width=768, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=425, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=375, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=320, initial-scale=1\">\n            <title>" + TITLE + "</title>\n        </head>\n        ");
}
function getBody() {
    return ("\n         <body>\n            <div id=\"root\"></div>\n            <script src=\"dist/main.js\"></script>\n          </body>\n        ");
}
indexRouter.get('/', function (req, res) {
    res.end("\n            <!DOCTYPE html>\n                <html lang=\"ru\">\n                    " + getHeader() + "\n                    " + getBody() + "\n                </html>\n            ");
});
exports.default = indexRouter;
