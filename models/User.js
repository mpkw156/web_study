export const User = (sequelize, DataTypes) => {
//module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        id : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        nickname : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true
        }
    });
};