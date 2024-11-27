const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    userid: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'users',  // Explicit table name
});

module.exports = User;
