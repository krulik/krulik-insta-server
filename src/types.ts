import { Express } from "express";
import { MongoClient } from "mongodb";

export interface AppEnv {
  port: string | number;
  mongoUrl: string;
  debug: boolean;
  uploadsPath: string;
}

export type AppMongoClient = typeof MongoClient;

export interface AppContext {
  app: Express,
  mongoClient: AppMongoClient
}