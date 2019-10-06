const path = require('path');
const fs = require('fs');

module.exports = app => {
    app.get('/', (req, res) => {
        res.setHeader('Content-type', 'text/html');
        res.send(fs.readFileSync(path.resolve(__dirname, '../../index.html')));
    });
    return app;
};
