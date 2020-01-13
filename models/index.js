
import Sequelize from 'sequelize';
import path from 'path';

import { User } from './User';

const config = require(path.join(__dirname, '..', 'config', 'config.json'))['development'];

/* config.json에서 config객체를 불러온다.
[] 안에 인자가 config.json에 development를 쓰겠다는 의미.*/

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
    ,{ 
    dialect: 'mariadb'
});

const db = {};
//db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
export { sequelize, Sequelize, User };

sequelize.sync({force: true}).then(() => {
    console.log('✓ DB connection success.');
})
.catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});//sync error가 뜰시 models/index.js에 넣고 동작.