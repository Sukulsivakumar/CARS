const {DataTypes} = require('sequelize');
const sequelize = require('../db/connection')

const InputData = sequelize.define('InputData',{
    userid:{
        type: DataTypes.STRING(6),
        allowNull: true,
    },
    transid:{
        type: DataTypes.STRING(9),
        allowNull: false,
        unique: true
    },
    transdate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    transtime:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    insttype:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    instnumber:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    transremarks:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    debit:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    credit:{
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    balance:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    tableName: 'inputdata'
})

module.exports = InputData;