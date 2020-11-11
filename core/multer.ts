import multer from 'multer';
import path from 'path';
import express from 'express';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (
    _,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ): void => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};
export const upload = multer({ storage: storage, fileFilter });
