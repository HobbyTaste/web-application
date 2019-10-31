import {Response, Request, Router} from 'express';
import {getTemplate} from '../utils/render';

const providerRouter: Router = Router();

providerRouter.get('/', (req: Request, res: Response) => {
  res.redirect('cabinet');
});

providerRouter.get('/cabinet', (req: Request, res: Response) => {
  res.end(getTemplate());
});

export default providerRouter;
