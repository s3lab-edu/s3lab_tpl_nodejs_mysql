const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');

let User = MySequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    loginName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    displayName: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    language: {
        type: Sequelize.CHAR(2),
        allowNull: false
    },
    type: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    activated: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    },
    createdBy: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.User,
            key: 'id'
        }
    },
    updatedBy: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {
            model: this.User,
            key: 'id'
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
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