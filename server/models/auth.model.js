const { DataTypes } = require("sequelize");
const sequelize = require('../db/connection')

const Auth =  sequelize.define('Auth',{
    email:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    username:{
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING(200),
        allowNull: false,
    }
},{
    tableName: 'auth',
})

module.exports = Auth;