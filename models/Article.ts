import { model, Schema } from 'mongoose';

const CommentSchema = new Schema({
  body: {
    required: true,
    type: String,
  },
});

export const ArticleSchema = new Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
  body: {
    required: true,
    type: String,
    unique: true,
  },
  comments: [CommentSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const ArticleModel = model('Article', ArticleSchema);
