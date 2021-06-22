import createHttpError from 'http-errors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { router as indexRouter } from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use((req: Request, res: Response, next: NextFunction) => next(createHttpError(404)));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
