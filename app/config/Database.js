let DBConnectorSetting = {
    mysql1: {
        host: '127.0.0.1',
        port: '3306',
        username: 'root',
        password: '',
        database: 'image_archive_vdc_v1',
        dialect: 'mysql'
    },
    mysql: {
        host: 'db4free.net',
        port: '3306',
        username: 'gemini',
        password: '48429e5d',
        database: 'image_archive',
        dialect: 'mysql'
    }
};

module.exports = DBConnectorSetting;