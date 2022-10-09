const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const User = require('./User');

let Device = MySequelize.define('device', {
    id: {
        field: "id",
        type: Sequelize.BIGINT(10),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        field: "code",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    name: {
        field: "name",
        type: Sequelize.STRING(64),
        allowNull: true,
        default: null
    },
    desc: {
        field: "desc",
        type: Sequelize.STRING(256),
        allowNull: true,
        default: null
    },
    isAlive: {
        field: "isAlive",
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: true
    },
    createdBy: {
        field: "createdBy",
        type: Sequelize.BIGINT(10),
        allowNull: false,
        default: '1',
        references: {
            model: User,
            key: 'id'
        }
    },
    updatedBy: {
        field: "updatedBy",
        type: Sequelize.BIGINT(10),
        allowNull: false,
        default: '1',
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        field: "createdAt",
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        field: "updatedAt",
        type: Sequelize.DATE,
        allowNull: true
    },

}, {
    underscored: true,
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    freezeTableName: true,
    tableName: 'device'
});

module.exports = Device;