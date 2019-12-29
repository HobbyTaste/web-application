import {Response, Request, Router} from 'express';

import User from '../models/user';
import {user as BASE_URL} from './routes.json';
import {uploadFileToS3} from '../utils/aws';

const userRouter: Router = Router();

const USER_URL_PAGES = {
    cabinet: `${BASE_URL}/cabinet`
};

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

userRouter.post('/edit', async (req: Request, res: Response) => {
    const {...nextParams} = req.body;
    if (!req.session || !req.session.user) {
        res.status(403).send('Пользователь не авторизован');
        return;
    }
    const {_id: id} = req.session.user;
    try {
        await User.findByIdAndUpdate(id, nextParams);
        res.end();
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
        const {_id: id, name, email, avatar} = user;
        res.json({id, name, email, avatar});
        return;
    }
    if (req.session && req.session.user) {
        const {_id: id, name, email, avatar} = req.session.user;
        res.json({id, name, email, avatar});
        return;
    }
    res.status(403).send('Текущий пользователь не прошел авторизацию');
});

userRouter.post('/upload', async (req: Request, res: Response) => {
    if (!req.session || !req.session.user) {
        res.status(403).send('Текущий пользователь не прошел авторизацию');
        return;
    }
    if (!req.files || !req.files.file || Array.isArray(req.files.file)) {
        res.status(400);
        return;
    }
    const file = req.files.file;
    if (!file.mimetype.match(/images/)) {
        res.status(400).send('Неверный формат изображения');
        return;
    }
    const {_id: userId} = req.session.user;
    try {
        const url = await uploadFileToS3('users/data', req.files.file);
        await User.findByIdAndUpdate(userId, {avatar: url});
        res.json({url});
    } catch (e) {
        res.status(500).send(e);
    }
});

export default userRouter;
