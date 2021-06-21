import { check } from 'express-validator';

export const ItemRegistrationValidator = [
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
];
