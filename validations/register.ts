import { body } from 'express-validator';

export const registerValidations = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({
      min: 6,
    })
    .withMessage('Min length 6 symbols')
    .matches(/\d/)
    .withMessage('must contain a number')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error('Password confirmation is incorrect');
      }
      return true;
    }),
  body('username')
    .not()
    .isEmpty()
    .withMessage('Field required')
    .isLength({ min: 3 })
    .withMessage('Min length 3 symbols'),
];
