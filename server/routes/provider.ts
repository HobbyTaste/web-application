import {Response, Request, Router} from 'express';
import Provider, {IProvider} from "../models/provider";
import multer from "multer";
import config from "config";
import {uploadFileToS3} from "../utils/aws";

const providerRouter: Router = Router();

const upload = multer({limits: {fieldSize: Number(config.get('aws.maxFileSize'))}});

providerRouter.post('/create', upload.single('avatar'), async (req: Request, res: Response) => {
    const {...profile}: IProvider = req.body;
    if (!profile.email) {
        res.status(400).send('Email обязателен');
        return;
    }
    const provider = await Provider.findOne({email: profile.email});
    if (provider) {
        res.status(400).send('Такой пользователь уже существует');
        return;
    }
    const file = req.file;
    if (file) {
        profile.avatar = await uploadFileToS3('provider', file);
    }
    const newProvider = new Provider({...profile});
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
    res.status(403).send('Текущий партнер не прошел авторизацию');
});

providerRouter.post('/edit', upload.single('avatar'), async (req: Request, res: Response) => {
    const {...nextData} = req.body;
    const file = req.file;
    if (file) {
        nextData.avatar = await uploadFileToS3('partner', file);
    }
    if (!req.session || !req.session.provider) {
        res.status(403).send('Партнер не авторизован');
        return;
    }
    const {_id: id} = req.session.partner;
    try {
        req.session.provider = await Provider.findByIdAndUpdate(id, nextData, {new: true});
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
    res.end();
});


export default providerRouter;
