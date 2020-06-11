const Sequelize = require('sequelize');
const MySequelize = require('../utils/Sequelize');
const User = require('./User');

let Device = MySequelize.define('device', {
    id: {
        type: Sequelize.BIGINT(10),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(64),
        allowNull: true,
        default: null
    },
    desc: {
        type: Sequelize.STRING(256),
        allowNull: true,
        default: null
    },
    status: {
        type: Sequelize.STRING(16),
        allowNull: true,
        default: "ACTIVATED"
    },
    isAlive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: true
    },
    socketIO: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    //config.general
    adminPassword: {
        type: Sequelize.STRING(64),
        allowNull: true,
        default:""
    },
    isFullscreen: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
        // config.general.extCode
    companyCode: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    siteCode: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
        // config.general.timer
    autoShutdownTime: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: 18
    },
    autoShutdownTimeMode: {
        type: Sequelize.TINYINT(4),
        allowNull: true,
        default: 1
    },
    productModeTime: {
        type: Sequelize.SMALLINT(10),
        allowNull: true,
        default: 20
    },
    previewTime: {
        type: Sequelize.SMALLINT(10),
        allowNull: true,
        default: 20
    },
    // config.mirror
    countdownTime: {
        type: Sequelize.BIGINT(10),
        allowNull: true,
        default: 3
    },
    isNeedOpenHelp: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },
    //config.device.sensor
    comName: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    isMovementEnable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },
    isIrEnable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },
    //config.device.camera
    camera: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    resolution: {
        type: Sequelize.STRING(64),
        allowNull: true
    },
    rotate: {
        type: Sequelize.BIGINT(10),
        allowNull: true,
        default: 0
    },
    // configOptions
    sensors:{
        type: Sequelize.STRING(128),
        allowNull: true
    },
    webcams:{
        type: Sequelize.STRING(128),
        allowNull: true
    },
    // development
    isDebugToolOpened: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },
    isCamInfoDisplayed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },
    createdBy: {
        type: Sequelize.BIGINT(10),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    updatedBy: {
        type: Sequelize.BIGINT(10),
        allowNull: false,
        references: {
            model: User,
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