import * as Express from 'express';

export const router = Express.Router();

router.get('/login', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  res.render('login', { title: 'Express' })
);
router.get('/register', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  res.render('register', { title: 'Express' })
);

export default router;
