"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_session_1 = __importDefault(require("cookie-session"));
exports.default = {
    configureMiddleware({ app }) {
        app.use((0, cookie_session_1.default)({
            name: 'mySession',
            secret: 'banana',
            maxAge: 30 * 1000
        }));
        app.use((req, res, next) => {
            if (!req.session.userId) {
                res.sendStatus(401);
                return;
            }
            next();
        });
        app.get('/login', (req, res, next) => {
            req.session.userId = 'krulik';
            res.sendStatus(204);
        });
        app.get('/', (req, res, next) => {
            res.send(JSON.stringify(req.session));
        });
    }
};
