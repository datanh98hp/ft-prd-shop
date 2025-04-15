import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storeConfig = (folder: string) =>
  diskStorage({
    destination: `upload/${folder}/`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

export const fileFilterConfig = {
  fileFilter: (req, file, cb) => {
    const sizeFile = parseInt(req.headers['content-length']);
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      req.fileValidate = `File type is not supported`;
    }
    if (sizeFile > 1024 * 1024 * 5) {
      // >5MB
      req.fileValidate = `File must less than 5MB`;
    } else {
      cb(null, true);
    }
  },
};
