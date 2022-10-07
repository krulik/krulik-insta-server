'use strict';

import { MongoClient } from 'mongodb';
import express from 'express';
import server from './server';
import middleware from './middleware';
import { AppContext, AppEnv } from './types';
import post from './routes/post';
import path from 'path';

const app = express();
const mongoClient = MongoClient;

const env: AppEnv = {
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL || '',
  debug: process.env.NODE_ENV !== 'production',
  uploadsPath: path.join(__dirname, '../uploads/')
};

const context: AppContext = {
  app,
  mongoClient
};

middleware.configureMiddleware(context, env);
post.configure(context, env);
server.start(context, env);