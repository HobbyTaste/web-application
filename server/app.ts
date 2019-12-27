import express, {NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import csrf from 'csurf';
import config from 'config';

import logger from './utils/logger';

import routes from './routes/routes.json';
import indexRouter from './routes/index';
import hobbyRouter from './routes/hobby';
import providerRouter from './routes/provider';
import userRouter from './routes/user';

const app: express.Application = express();

const secrets: any = {};
try {
    secrets.dbUser = require('../config/secrets.json').dbUser;
    secrets.dbPassword = require('../config/secrets.json').dbPassword;
} catch (e) {}

const LISTENING_PORT = process.env.PORT || Number(config.get('port')) || 3000;
const environment = process.env.NODE_ENV;
const MongoStore = connectMongo(expressSession);
const dbUser = process.env.DB_USER || secrets.dbUser;
const dbPassword = process.env.DB_PASSWORD || secrets.dbPassword;
let dbHost: string = config.get('dbHost');

if (!dbUser || !dbPassword) {
    logger.error("Secrets are not provided.");
    process.exit(1);
}

try {
    dbHost = dbHost.replace(/{dbUser}/, dbUser);
    dbHost = dbHost.replace(/{dbPassword}/, dbPassword);
} catch (e) {}

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
  secret: 'pugs do drugs',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: dbHost
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
app.use(routes.index, indexRouter);
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
mongoose.connect(dbHost, {
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
