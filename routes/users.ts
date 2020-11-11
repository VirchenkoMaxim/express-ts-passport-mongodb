import { Router } from 'express';
import passport from 'passport';
import { UserCtrl } from '../controllers/User';
import { upload } from '../core/multer';
import { registerValidations } from '../validations/register';

export const users = Router();

users.get('/:id', UserCtrl.index);
users.post('/', upload.single('imgUrl'), registerValidations, UserCtrl.create);
users.put(
  '/:id',
  passport.authenticate('jwt'),
  upload.single('imgUrl'),
  UserCtrl.update,
);
users.delete('/:id', passport.authenticate('jwt'), UserCtrl.delete);
users.get('/:id/articles', UserCtrl.getUserArticles);
