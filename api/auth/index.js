import Router from 'koa-router';
import { Register, Login, CheckUser } from './auth.controller';

const auth = new Router();

auth.get('/checkUser', CheckUser);

auth.post('./register', Register);
auth.post('/login', Login);

export default auth;