import Router from 'koa-router';
import { Register } from './auth.controller';

const auth = new Router();

auth.post('./register', Register);

export default auth;