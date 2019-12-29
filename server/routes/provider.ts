import {Response, Request, Router} from 'express';
import Provider, {IProvider} from "../models/provider";

const providerRouter: Router = Router();

providerRouter.post('/create', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password,
        avatar,
        phone,
        info
    }: IProvider = req.body;
    const provider = await Provider.findOne({email});
    if (provider) {
        res.status(400).send('Такой пользователь уже существует');
        return;
    }
    const newProvider = new Provider({
        email,
        password,
        name,
        avatar,
        phone,
        info
    });
    if (req.session) {
        req.session.provider = newProvider;
    }
    try {
        await newProvider.save();
        res.redirect('/provider/cabinet');
    } catch (e) {
        res.status(500).send(e);
    }
});

providerRouter.post('/login', async (req: Request, res: Response) => {
    if (req.session && req.session.provider) {
        res.end();
        return;
    }
    const {email, password} = req.body;
    const provider = await Provider.findOne({email});
    if (!provider) {
        res.status(400).json({
            login: 'Неверный логин',
            password: null,
        });
        return;
    }
    const isTruePassword = await provider.checkPasswords(password);
    if (isTruePassword) {
        if (req.session) {
            req.session.provider = provider;
        }
        res.redirect(`/provider/cabinet`);
        return;
    }
    res.status(400).json({
        login: null,
        password: 'Неверный пароль',
    })
});

providerRouter.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.provider = null;
    }
    res.end();
});

providerRouter.get('/info', async (req: Request, res: Response) => {
    const query = req.query;
    if (query.id) {
        const provider = await Provider.findById(query.id);
        if (!provider) {
            res.status(404).send('Не найден такой пользователь');
            return;
        }
        const {_id: id, password, ...restProperties} = provider;
        res.json({id, ...restProperties});
        return;
    }
    if (req.session && req.session.provider) {
        const {_id: id, password, ...restProperties} = req.session.provider;
        res.json({id, ...restProperties});
        return;
    }
    res.status(403).send('Текущий пользователь не прошел авторизацию');
});

export default providerRouter;
