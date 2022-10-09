const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const constant = require('../utils/Constant');

let User = MySequelize.define('user', {
    id: {
        field: "id",
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        field: "email",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    loginName: {
        field: "loginName",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    password: {
        field: "password",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    displayName: {
        field: "displayName",
        type: Sequelize.STRING(64),
        allowNull: false
    },
    language: {
        field: "language",
        type: Sequelize.CHAR(2),
        allowNull: true,
        default:'vi'
    },
    type: {
        field: "type",
        type: Sequelize.TINYINT(1),
        allowNull: true,
        default: constant.USER_TYPE.END_USER
    },
    activated: {
        field: "activated",
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    createdBy: {
        field: "createdBy",
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.User,
            key: 'id'
        }
    },
    updatedBy: {
        field: "updatedBy",
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.User,
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
    }
}, {
    underscored: true,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'user'
});

module.exports = User;