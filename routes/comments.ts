import { Router } from 'express';
import { CommentCtrl } from '../controllers/Comment';

export const comment = Router();

comment.post('/:id', CommentCtrl.add);
comment.delete('/:id', CommentCtrl.delete);
