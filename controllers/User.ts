import express from 'express';
import { UserModel } from '../models/User';
import _ from 'lodash';
import { validationResult } from 'express-validator';
import { ArticleModel } from '../models/Article';

export interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
  imgUrl: string;
}
const imgPath = (host: string | undefined, imgPath: string): string => {
  return `${host}/${imgPath}`;
};

class UserController {
  async index(req: express.Request, res: express.Response) {
    console.log(req.session);
    try {
      let data: User = (await UserModel.findById(req.params.id))?.toObject({
        getters: true,
      });
      data.imgUrl = imgPath(req.headers.host, data.imgUrl);

      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.json({
        status: 'failed',
        error: error.message,
      });
    }
  }
  async create(req: express.Request, res: express.Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user: User = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        imgUrl: req.file.path,
      };
      const data: User = (await UserModel.create(user)).toObject({
        getters: true,
      });
      data.imgUrl = imgPath(req.headers.host, data.imgUrl);
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.json({
        status: 'failed',
        error: error,
        message: error.message,
      });
    }
  }
  async update(req: express.Request, res: express.Response) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        imgUrl: req.file?.path,
      };

      const filteredUser = _.pickBy(user, (v) => v !== null && v !== undefined);
      const data: User = await UserModel.updateOne(
        { _id: req.params.id },
        filteredUser,
      );
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.json({
        status: 'failed',
        error,
      });
    }
  }
  async delete(req: express.Request, res: express.Response) {
    try {
      const data = await UserModel.deleteOne({ _id: req.params.id });
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.json({
        status: 'failed',
        error,
      });
    }
  }
  async getUserArticles(req: express.Request, res: express.Response) {
    try {
      let data = await ArticleModel.find({ owner: req.params.id }).populate(
        'owner',
        'username',
      );

      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      res.json({
        status: 'failed',
        error: error.message,
      });
    }
  }
}

export const UserCtrl = new UserController();
