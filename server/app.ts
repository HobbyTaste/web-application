import express, {NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import csrf from 'csurf';

import logger from './utils/logger';
import {trailingSlashMiddleware} from './utils/trailingSlashes';
import config from './config.json';

import routes from './routes/routes.json';
import indexRoute from './routes/index';
import hobbyRouter from './routes/hobby';
import providerRouter from './routes/provider';
import userRouter from "./routes/user";

const app: express.Application = express();

const LISTENING_PORT = process.env.PORT || Number(config.port) || 3000;
const environment = process.env.NODE_ENV;
const MongoStore = connectMongo(expressSession);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
  secret: 'pugs do drugs',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.dbHost
  })
}));
app.use(csrf());

app.use('/dist', express.static('dist', {
  etag: false,
}));
app.use('/public/images', express.static('images'));

app.listen(LISTENING_PORT, () => {
  logger.info(`Server start listening on PORT: ${LISTENING_PORT}, http://localhost:${LISTENING_PORT}`);
});

// routes
app.use(routes.index, indexRoute);
app.use(routes.hobby, hobbyRouter);
app.use(routes.provider, providerRouter);
app.use(routes.user, userRouter);

// error middleware

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.setHeader('csrf-token', req.csrfToken());
        res.status(401).end();
        return;
    }
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
