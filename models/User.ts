import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    imgUrl: String,
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

export const UserModel = model('User', UserSchema);
