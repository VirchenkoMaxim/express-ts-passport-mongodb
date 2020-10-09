import { Router } from 'express';
import { articles } from './articles';
import { comment } from './comments';
import { auth } from './auth';
import { users } from './users';

export const router = Router();

router.use('/articles/', articles);
router.use('/users/', users);
router.use('/comments/', comment);
router.use('/auth/', auth);
