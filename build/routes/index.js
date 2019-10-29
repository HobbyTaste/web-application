"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var router = express.Router();
var TITLE = 'Hobby taste';
function getHeader() {
    return ("\n        <head>\n            <meta charset=\"UTF-8\">\n            <link href=\"public/images/favicon.ico\" rel=\"icon\">\n            <meta name=\"viewport\" content=\"width=768, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=425, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=375, initial-scale=1\">\n            <meta name=\"viewport\" content=\"width=320, initial-scale=1\">\n            <title>" + TITLE + "</title>\n        </head>\n        ");
}
function getBody() {
    return ("\n         <body>\n            <div id=\"root\"></div>\n            <script src=\"dist/main.js\"></script>\n          </body>\n        ");
}
router.get('/', function (req, res) {
    res.end("\n            <!DOCTYPE html>\n                <html lang=\"ru\">\n                    " + getHeader() + "\n                    " + getBody() + "\n                </html>\n            ");
});
module.exports = router;
