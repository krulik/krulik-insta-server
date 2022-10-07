import cookieSession from 'cookie-session';
import cors from 'cors';
import { AppContext } from '../types';

export default {
  configureMiddleware({app}: Pick<AppContext, 'app'>, {}) {

    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }));

    app.use(cookieSession({
      name: 'mySession',
      secret: 'banana',
      maxAge: 1 * 60 * 1000,
      // sameSite: 'lax',
      // secure: false
    }));

    app.use((req, res, next) => {
      if (req.path === '/login') {
        return next();
      }
      if (!req.session?.userId) {
        res.sendStatus(401);
        return;
      }
      next();
    });

    app.get('/login', (req, res, next) => {
      req.session = {userId: 'krulik'};
      res.sendStatus(204);
    })

    app.get('/', (req, res, next) => {
      res.send(JSON.stringify(req.session))
    })
  }
}