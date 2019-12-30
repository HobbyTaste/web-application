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

pagesToRender.forEach(path => indexRouter.get(...renderPage(path)));

export default indexRouter;

