require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

import Router from 'koa-router';
import bodyPaerser from 'koa-bodyparser';
import api from './api';
import { sequelize } from './models';

const router = new Router();
const path = require('path');

sequelize.sync()
.then(()=> {
    console.log('Connected MariaDB!')
});

app.use(ctx => {
    ctx.body = 'Hello';
});

router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is listening to port ` + port);
});


module.exports = router;