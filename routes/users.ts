import { Router } from 'express';
import { UserCtrl } from '../controllers/User';
import { upload } from '../core/multer';
import { registerValidations } from '../validations/register';
import { isAuth, notAuth } from './articles';

export const users = Router();

users.get('/:id', UserCtrl.index);
users.post(
  '/',
  notAuth,
  registerValidations,
  upload.single('imgUrl'),
  UserCtrl.create,
);
users.put('/:id', isAuth, upload.single('imgUrl'), UserCtrl.update);
users.delete('/:id', isAuth, UserCtrl.delete);
users.get('/:id/articles', UserCtrl.getUserArticles);
