//require('dotenv').config();

const Koa = require('koa');
const app = new Koa();
import bodyPaerser from 'koa-bodyparser';
import Sequelize from 'sequelize';

//const sync = require('sequelize-cli');
import { sequelize } from './models';

/*sequelize.sync().then(() => {
    console.log('✓ DB connection success.');
})
.catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});>>메인 index.js에서 sync오류 뜰땐  /models/index.js에 넣어서 작동.*/

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server is listening to port ' + port);
});

/*models.User.findAll().then((result) => {
    res.json(result);
})
.catch(err => {
    console.error(err);
});

models.User.create({userID: '유저ID', password: '유저pw'}).then(result => {
    res.json(result);
})
.catch(err => {
    console.error(err);
});*/