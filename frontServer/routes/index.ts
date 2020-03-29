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
indexRouter.get(['/?',
    '/user/cabinet/?',
    '/provider/cabinet/?',
    '/hobbies/:type/:metro?',
    '/search/:category',
], (req, res) => {
    res.end(getTemplate());
});

export default indexRouter;
