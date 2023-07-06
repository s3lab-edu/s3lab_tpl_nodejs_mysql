const config = require('../configs/general.config');
const Sequel = require('sequelize');

const MySQLSequel = new Sequel(
    config.DBConnectors.database,
    config.DBConnectors.username,
    config.DBConnectors.password, {
        host: config.DBConnectors.host,
        port: config.DBConnectors.port,
        dialect: config.DBConnectors.dialect,
        logging: false,
        define: {
            underscored: false,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 100000,
        },
    },
);

module.exports = MySQLSequel;
