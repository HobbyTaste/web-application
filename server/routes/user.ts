import {Response, Request, Router} from 'express';
import {getTemplate} from '../utils/render';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.redirect('cabinet');
});

userRouter.get('/cabinet', (req: Request, res: Response) => {
  res.end(getTemplate());
});

export default userRouter;
