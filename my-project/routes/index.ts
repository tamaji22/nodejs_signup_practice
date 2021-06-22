import * as Express from 'express';

export const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  res.render('index', { title: 'Express' })
);
