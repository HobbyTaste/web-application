import {Router, Request, Response} from 'express';
import {isNil} from 'lodash';
import {getTemplate} from '../utils/render';

import Hobby from '../models/hobby';
import logger from "../utils/logger";

const hobbyRouter: Router = Router();

interface ReqBodyAddI {
  label: string;
  phoneNumber: string;
  address: string;
  metroStation: string;
  description: string;
  shortDescription: string;
}

interface ReqQueryFindI {
  label: string;
  startsWith: string;
  contains: string;
}

hobbyRouter.get('/', (req: Request, res: Response) => {
  res.redirect('new');
});

hobbyRouter.get('/new', (req: Request, res: Response) => {
  res.end(getTemplate());
});

hobbyRouter.post('/add', (req: Request, res: Response) => {
  const {label, phoneNumber, address, metroStation, description, shortDescription}: ReqBodyAddI = req.body;
  const hobby = new Hobby({
    label,
    value: label,
    phoneNumber,
    address,
    metroStation,
    description,
    shortDescription,
  });
  hobby.save()
      .then((data) => logger.info(`Data was saved to Users model: ${data}`))
      .catch((error) => logger.error(`An error occurred during saving data to model: ${error}`));
  res.end();
});

hobbyRouter.get('/find', (req: Request, res: Response) => {
    const {startsWith, label, contains}: ReqQueryFindI = req.query;
    let query;
    if (!isNil(label)) {
      query = Hobby.find({value: label.toLowerCase()})
    } else if (!isNil(contains)) {
        query = Hobby.find({value: RegExp(`${contains.toLowerCase()}`)});
    } else if (!isNil(startsWith)) {
        query = Hobby.find({value: RegExp(`^${startsWith.toLowerCase()}`)});
    } else {
      res.status(404).end('Check your query params');
      return;
    }
    query
        .exec()
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((error: string) => {
          res.status(500).end();
          logger.error(`An error occurred during finding data in model: ${error}`);
        });
});

export default hobbyRouter;
