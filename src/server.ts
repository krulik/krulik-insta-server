import { AppContext, AppEnv, AppMongoClient } from "./types";

function connectToMongo(mongoClient: AppMongoClient, mongoUrl: string) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(db);
    });
  });
}

export default  {

  async start({app, mongoClient}: AppContext, {port, mongoUrl, debug}: AppEnv) {
    if (debug) {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      });
      return;
    }

    if (!mongoUrl) {
      console.error(`[ERROR] please set MONGO_URL env var`);
      return;
    }

    let db;
    try {
      db = await connectToMongo(mongoClient, mongoUrl)
      console.log('Connected successfully to mongo', db);
    } catch (err) {
      console.error(`[ERROR] error connecting to mongo err=[${err}]`)
      return;
    }

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  }
}