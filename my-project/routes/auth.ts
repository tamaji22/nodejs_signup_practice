import * as Express from 'express';
import { check, validationResult } from 'express-validator';

export const router = Express.Router();

router.get('/login', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  res.render('login', { title: 'Express' })
);
router.get('/register', (req: Express.Request, res: Express.Response, next: Express.NextFunction) =>
  res.render('register', {
    title: 'Express',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: '',
  })
);

// ユーザー新規登録画面で登録要求した場合のリクエスト処理
router.post(
  '/register',
  [
    check('userName').not().isEmpty().withMessage('ユーザー名を入力してください'),
    check('email').not().isEmpty().withMessage('メールアドレスを入力してください'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('パスワードを入力してください')
      .isLength({ min: 7 })
      .withMessage('7文字以上入力してください')
      .custom((value, { req }) => {
        if (req.body.password !== req.body.passwordConfirmation) {
          throw new Error('パスワード（確認）と一致しません');
        }
        return true;
      }),
    check('passwordConfirmation').not().isEmpty().withMessage('確認用パスワードを入力してください'),
  ],
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // 入力内容に問題があった場合、エラーメッセージを含めて新規登録画面を表示
      const errorsArray = errors.array();
      res.render('register', {
        title: 'Express',
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
        errorMessage: errorsArray,
      });
    } else {
      // 入力内容が問題ない場合、ホーム画面を表示
      res.render('index', {
        title: 'Express',
        userName: req.body.userName,
      });
    }
  }
);

export default router;
