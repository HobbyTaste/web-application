import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';

import logger from './utils/logger';
const config = require('./config.json');

const indexRoute = require('./routes/index');
import hobbyRouter from './routes/hobby';

const app = express();

const LISTENING_PORT = process.env.PORT || Number(config.port) || 3000;
const environment = process.env.NODE_ENV;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/dist', express.static('dist'));
app.use('/public/images', express.static('images'));

app.listen(LISTENING_PORT, () => {
  logger.info(`Server start listening on PORT: ${LISTENING_PORT}, http://localhost:${LISTENING_PORT}`);
});

// routes
app.use(indexRoute);
app.use('/hobby', hobbyRouter);
app.use((err: string, req: any, res: any, next: Function) => {
  res.status(404).end();
});

// MongoDB
mongoose.connect(config.dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
        () => {
          logger.info(`Connect to mongoDB: success`);
        },
        (err: string) => {
          logger.error(`MongoDB error: ${err}`);
        }
    );
