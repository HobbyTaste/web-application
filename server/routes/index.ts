import {Router, Request, Response} from 'express';
import {getTemplate} from '../utils/render';

const indexRouter: Router = Router();

indexRouter.get('/', (req: Request, res : Response) => {
    res.end(getTemplate());
});

export default indexRouter;

