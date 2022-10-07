'use strict';
const mongodb = require('mongodb');
const express = require('express');
const server = require('./server');
const middleware = require('./middleware');
const app = express();
const mongoClient = mongodb.MongoClient;
const env = {
    port: process.env.PORT || 5000,
    mongoUrl: process.env.MONGO_URL || '',
    debug: process.NODE_ENV !== 'production'
};
const context = {
    app,
    mongoClient
};
middleware.configureMiddleware(context, env);
server.start(context, env);
