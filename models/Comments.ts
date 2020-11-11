import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    body: {
      required: true,
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Schema.Types.Date,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  },
  {
    toObject: {
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.articleId;
      },
    },
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.articleId;
      },
    },
  },
);

export const CommentModel = model('Comment', CommentSchema);
