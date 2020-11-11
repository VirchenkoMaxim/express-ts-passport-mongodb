import { model, Schema } from 'mongoose';

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

export const ArticleModel = model('Article', ArticleSchema);
