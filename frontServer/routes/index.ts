import {Router, Request, Response} from 'express';
import {getTemplate, renderPage} from '../utils/render';

const indexRouter: Router = Router({
    strict: true,
});

const pagesToRender = [
    '',
    'user/cabinet',
    'user/cabinet/hobbies',
    'provider/cabinet',
    'hobbies',
    'hobby/card',
    'search',
];

pagesToRender.forEach(path => indexRouter.get(...renderPage(path)));
indexRouter.get(['/?',
    '/user/cabinet/?',
    '/user/cabinet/hobbies',
    '/provider/cabinet/?',
    '/hobbies/:type/:metro?',
    '/search/:category?',
    '/hobby/card/:id',
], (req, res) => {
    res.end(getTemplate());
});

export default indexRouter;
