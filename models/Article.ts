import { model, Schema } from 'mongoose';

export const ArticleSchema = new Schema(
  {
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
  },
  {
    toObject: {
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const ArticleModel = model('Article', ArticleSchema);
