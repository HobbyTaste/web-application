import express, {NextFunction, Request, Response} from 'express';
import indexRouter from './routes/index';
import config from 'config';

const app: express.Application = express();

const LISTENING_PORT = Number(config.get('port_front')) || 3001;

app.use('/dist', express.static('dist', {
    etag: false,
}));

app.use('/public/images', express.static('images'));

app.listen(LISTENING_PORT, () => {
    console.log(`Server start listening on PORT: ${LISTENING_PORT}, http://localhost:${LISTENING_PORT}`);
});

// routes
app.use('/', indexRouter);
