"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("./utils/logger"));
var config_json_1 = __importDefault(require("./config.json"));
var index_1 = __importDefault(require("./routes/index"));
var hobby_1 = __importDefault(require("./routes/hobby"));
var app = express_1.default();
var LISTENING_PORT = process.env.PORT || Number(config_json_1.default.port) || 3000;
var environment = process.env.NODE_ENV;
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(express_1.default.urlencoded());
app.use(cookie_parser_1.default());
app.use('/dist', express_1.default.static('dist'));
app.use('/public/images', express_1.default.static('images'));
app.listen(LISTENING_PORT, function () {
    logger_1.default.info("Server start listening on PORT: " + LISTENING_PORT + ", http://localhost:" + LISTENING_PORT);
});
// routes
app.use(index_1.default);
app.use('/hobby', hobby_1.default);
app.use(function (err, req, res, next) {
    res.status(404).end();
});
// MongoDB
mongoose_1.default.connect(config_json_1.default.dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    logger_1.default.info("Connect to mongoDB: success");
}, function (err) {
    logger_1.default.error("MongoDB error: " + err);
});
