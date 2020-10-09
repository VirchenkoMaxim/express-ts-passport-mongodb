import express from 'express';
import jwt from 'jsonwebtoken';

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
  static async logout(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      req.logout();
      res.send({
        result: 'success',
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
      res.json({
        status: 'success',
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
}
