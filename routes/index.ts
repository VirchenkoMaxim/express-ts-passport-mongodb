import { Router } from 'express';
import { articles } from './articles';
import { auth } from './auth';
import { comments } from './comments';
import { users } from './users';

export const router = Router();

router.use('/articles/', articles);
router.use('/users/', users);
router.use('/auth/', auth);
router.use('/comments/', comments);
