import {Router, Request, Response} from 'express';
import {getTemplate, renderPage} from '../utils/render';

const indexRouter: Router = Router({
    strict: true,
});

const pagesToRender = [
    '',
    'user/cabinet',
    'provider/cabinet',
    'hobbies',
];

indexRouter.get(...renderPage(''));

export default indexRouter;

