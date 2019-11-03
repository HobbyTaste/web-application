import {Request, Response, NextFunction} from 'express';

export function trailingSlashMiddleware(req: Request, res: Response, next: NextFunction) {
  // get запрос с параметрами
  if (req.url.match(/\?.+$/) || req.method !== 'GET') {
    next();
  }
  // добавляет / на конце, если он отсутствует
  if (req.url.substr(-1) !== '/') {
    res.redirect(req.url + '/');
  }
  next();
}
