//require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
const ejs = require('ejs');
import Router from 'koa-router';
import bodyPaerser from 'koa-bodyparser';
import api from './api';
import { sequelize } from './models';

const router = new Router();

const port = process.env.PORT || 3000;

/*app.use(ctx => {
    ctx.body = 'hello';
});*/

app.listen(port, () => {
    console.log('server is listening to port ' + port);
});

router.use('/api', api.routes());

/*sequelize.sync().then(() => {
    console.log('✓ DB connection success.');
})
.catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});>>메인 index.js에서 sync오류 뜰땐  /models/index.js에 넣어서 작동.*/
