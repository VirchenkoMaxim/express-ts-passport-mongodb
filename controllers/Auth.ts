import express from 'express';
import jwt from 'jsonwebtoken';
import { imgPath, User } from './User';

export class LoginCtrl {
  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      res.json({
        status: 'success',
        data: {
          ...req.user,
          token: jwt.sign({ data: req.user }, process.env.SECRET_KEY || 'key', {
            expiresIn: '30d',
          }),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async show(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data: User = { ...req.user } as User;
      data.imgUrl = imgPath(req.headers.host, data.imgUrl);
      res.json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
