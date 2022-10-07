import multer from 'multer';
import { AppEnv } from '../types';

export default {
  create({uploadsPath}: Pick<AppEnv, 'uploadsPath'>) {
    return multer({ storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadsPath)
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        const parts = file.originalname.split('.');
        const extension = parts[parts.length - 1];
        const fullName = file.fieldname + uniqueSuffix + '.' + extension;
        cb(null, fullName)
      }
    }) });
  }
};