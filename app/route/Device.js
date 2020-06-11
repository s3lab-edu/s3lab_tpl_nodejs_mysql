/*
 * Created by s3lab. on 1/13/2017.
 */
// our components
const DeviceCtrl = require('../controllers/DeviceCtrl');

module.exports = function (app) {

    app.post('/v1/auth/devices', DeviceCtrl.create);
    app.post('/v1/auth/devices/notify_sync', DeviceCtrl.notifySync);
    app.post('/v1/auth/devices/notify_upgrade', DeviceCtrl.notifyUpgrade);
    app.get('/v1/auth/devices/:id', DeviceCtrl.getOne);
    app.get('/v1/auth/devices/statistic', DeviceCtrl.getOne);
    app.get('/v1/auth/devices', DeviceCtrl.getAll);
    app.put('/v1/auth/devices/:id', DeviceCtrl.update);
    app.delete('/v1/auth/devices/:id', DeviceCtrl.delete);
};
