import {Router, Request, Response} from 'express';
import {isNil} from 'lodash';

import Hobby, {IHobby} from '../models/hobby';

const hobbyRouter: Router = Router();

/**
 * Добавление нового хобби в БД
 */
hobbyRouter.post('/add', async (req: Request, res: Response) => {
  try {
      const hobbyInfo: IHobby = {...req.body};
      const newHobby = new Hobby({...hobbyInfo});
      await newHobby.save();
      res.status(200).end();
  } catch (e) {
      res.status(500).send(e);
  }
});

/**
 * Поиск хобби по вхождению в него слова
 * label - название хобби (возможно только часть)
 * metroId - id-метро берущийся из стороннего API
 */
hobbyRouter.get('/find', async (req: Request, res: Response) => {
    const {label, metroId}: Partial<IHobby> = req.query;
    if (!isNil(label)) {
        try {
            const numberMetroId = Number(metroId);
            const hobbies = isNaN(numberMetroId)
                ? await Hobby.findByLabel(label)
                : await Hobby.findByLabelWithGeo(label, numberMetroId);
            res.json(hobbies);
            return;
        } catch (e) {
            res.status(500).send(e);
            return;
        }
    }
    res.status(400).send(`typeof label = ${typeof label}`);
});

/**
 * Возвращает все хобби из БД
 */
hobbyRouter.get('/all', async (req: Request, res: Response) => {
    try {
        const hobbies = await Hobby.find({});
        res.json(hobbies);
    } catch (e) {
        res.status(500).send(e);
    }
    return;
});

/**
 * Возвращает информацию по конкретному хобби
 * id - параметр GET запроса
 */
hobbyRouter.get('/info', async (req: Request, res: Response) => {
    const {id} = req.query;
    try {
        const hobby = await Hobby.findById(id);
        res.json(hobby);
    } catch (e) {
        res.status(500).send(e);
    }
});

/**
 * Обновляет данные по хобби и его id
 * id - параметр запроса
 */
hobbyRouter.post('/edit', async (req: Request, res: Response) => {
    const {id} = req.query;
    const updateParams: IHobby = {...req.body};
    try {
        await Hobby.findByIdAndUpdate(id, updateParams);
        res.end();
    } catch (e) {
        res.status(500).send(e);
    }
});

export default hobbyRouter;
