const express = require('express');
const path = require('path');
const withRoutes = require('./routes');

const app = express();
withRoutes(app);

app.use('/dist', express.static('dist'));
app.use('/public/images', express.static('images'));
app.listen(process.env.PORT || 3000);
