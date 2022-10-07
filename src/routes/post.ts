import express from 'express';
import upload from '../middleware/multer';
import { AppContext, AppEnv } from '../types';


export default {
  configure({app}: Pick<AppContext, 'app'>, {uploadsPath}: AppEnv) {
    app.use('/uploads', express.static(uploadsPath));

    app.post('/posts', upload.create({uploadsPath}).single('img'), (req, res) => {
      // mongo.save(post.id, {
      //   imgUrl: `files/${req.file.fileName}`
      // })
      res.send({...req.body, file: req.file});
    });

    app.get('/posts', (req, res, next) => {
      res.json([
        {
          _id: 'server message id',
          data: 'some text',
          mediaUrl: 'uploads/img1664805051985.png'
        }
      ])
    })
  }
}