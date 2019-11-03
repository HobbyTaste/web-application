"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trailingSlashMiddleware(req, res, next) {
    // get запрос с параметрами
    if (req.url.match(/\?.+$/)) {
        next();
    }
    // добавляет / на конце, если он отсутствует
    if (req.url.substr(-1) !== '/') {
        res.redirect(req.url + '/');
    }
    next();
}
exports.trailingSlashMiddleware = trailingSlashMiddleware;
