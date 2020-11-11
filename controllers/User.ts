import express from 'express';
import { UserModel } from '../models/User';
import _ from 'lodash';
import { validationResult } from 'express-validator';
import { ArticleModel } from '../models/Article';
import fs from 'fs';
import { join } from 'path';
import { imgPath } from '../utils/helpFunctions';

export interface ResUser {
  email: string;
  password: string;
  username: string;
  imgUrl: string;
}
export interface ReqUser {
  id: string;
  email?: string;
  username: string;
  imgUrl: string;
}

export class UserController {
  private customFilePath = 'uploads/custom.png';

  async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      let data: ReqUser = (await UserModel.findById(req.params.id))?.toObject({
        getters: true,
      });
      data.imgUrl = imgPath(data.imgUrl);
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const path = req.file?.path.split('\\').join('/') || this.customFilePath;
      const user: ResUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        imgUrl: path,
      };

      const data: ReqUser = (await UserModel.create(user)).toObject();
      data.imgUrl = imgPath(data.imgUrl);
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      if (req.file) {
        const filePath = join(__dirname, '..', req.file.path);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      next(error);
    }
  }

  async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const path = req.file.path.split('\\').join('/');
      const user: ResUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        imgUrl: path,
      };
      const filteredUser = _.pickBy(
        user,
        (v: string) => v !== null && v !== undefined,
      );
      const data: ReqUser = await UserModel.updateOne(
        { _id: req.params.id },
        filteredUser,
      );
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user: ReqUser = (await UserModel.findById(req.params.id))?.toObject(
        {
          getters: true,
        },
      );
      if (this.customFilePath != user.imgUrl) {
        const filepath = join(__dirname, '..', user.imgUrl);
        fs.unlink(filepath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      const data = await UserModel.deleteOne({ _id: req.params.id });
      res.json({
        status: 'success',
        data,
      });
    } catch (error) {
      next(error);
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
