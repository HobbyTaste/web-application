import {Response, Request, Router} from 'express';
import {getTemplate} from '../utils/render';
import User from '../models/user';
import {user as BASE_URL} from './routes.json';

const userRouter: Router = Router({
    strict: true,
});

const USER_URL_PAGES = {
    cabinet: `${BASE_URL}/cabinet`
};

userRouter.get(/^\/?$/, (req: Request, res: Response) => {
  res.redirect(USER_URL_PAGES.cabinet);
});

userRouter.get(/^\/cabinet\/?/, (req: Request, res: Response) => {
  res.end(getTemplate());
});

userRouter.post('/login', async (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    res.redirect(USER_URL_PAGES.cabinet);
    return;
  }
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    res.status(400).json({
      login: 'Неверный логин',
      password: null,
    });
    return;
  }
  const isTruePassword = await user.checkPasswords(password);
  if (isTruePassword) {
      if (req.session) {
          req.session.user = user;
      }
      res.redirect(`${BASE_URL}/cabinet`);
      return;
  }
  res.status(400).json({
      login: null,
      password: 'Неверный пароль',
  })
});

userRouter.post('/create', async (req: Request, res: Response) => {
    const {email, password, name} = req.body;
    const user = await User.findOne({email});
    if (user) {
        res.status(400).send('Такой пользователь уже существует');
        return;
    }
    const newUser = new User({
        email,
        password,
        name,
    });
    if (req.session) {
        req.session.user = newUser;
    }
    try {
        await newUser.save();
        res.redirect(USER_URL_PAGES.cabinet);
    } catch (e) {
        res.status(500).send(e);
    }
});

userRouter.get(/^\/logout\/?$/, (req: Request, res: Response) => {
    if (req.session) {
        req.session.user = null;
    }
    res.end();
});

export default userRouter;
