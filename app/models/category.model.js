const sequel = require('sequelize');
const mySequel = require('../utils/sequelize.util');
const account = require('./account.model');

const category = mySequel.define('category', {
    id: {
        type: sequel.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequel.STRING(1024),
        allowNull: false,
    },
    created_by: {
        type: sequel.BIGINT(20),
        allowNull: false,
        references: {
            model: account,
            key: 'id',
        },
    },
    updated_by: {
        type: sequel.BIGINT(20),
        allowNull: false,
        references: {
            model: account,
            key: 'id',
        },
    },
    created_at: {
        type: sequel.DATE,
        allowNull: true,
        defaultValue: sequel.NOW
    },
    updated_at: {
        type: sequel.DATE,
        allowNull: true,
        defaultValue: sequel.NOW
    },
}, {
    underscored: false,
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    includeDeleted: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tbl_category',
});

module.exports = category;
