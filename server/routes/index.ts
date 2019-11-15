import {Router, Request, Response} from 'express';
import {getTemplate, renderPage} from '../utils/render';

const indexRouter: Router = Router({
    strict: true,
});

indexRouter.get(...renderPage(''));

export default indexRouter;

