
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

export { sequelize, Sequelize, User };

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

