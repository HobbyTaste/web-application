import {Response, Request, Router} from 'express';
import {renderPage} from '../utils/render';
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

userRouter.get(...renderPage('cabinet'));

userRouter.post('/login', async (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    res.end();
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

userRouter.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.user = null;
    }
    res.end();
});

interface IQueryInfo {
    id?: string;
}

userRouter.get('/info', async (req: Request, res: Response) => {
    const query: IQueryInfo = req.query;
    if (query.id) {
        const user = await User.findById(query.id);
        if (!user) {
            res.status(404).send('Не найден такой пользователь');
            return;
        }
        const {_id: id, name: name, email: email} = user;
        res.json({id, name, email});
        return;
    }
    if (req.session && req.session.user) {
        const {_id: id, name: name, email: email} = req.session.user;
        res.json({id, name, email});
        return;
    }
    res.status(403).send('Текущий пользователь не прошел авторизацию');
});

export default userRouter;
