/**
 * Created by bioz on 1/13/2017.
 */
// our components
const SocketCtrl = require('../controllers/SocketCtrl');
const DeviceManager = require('../manager/DeviceManager');


exports.updateLiveStatusToOffline = function (socketId) {
    DeviceManager.updateLiveStatus(socketId, false, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Close the socket: ' + socketId);
        }
    });
};

exports.updateCurrentInfo = function (deviceData, socketId) {
    DeviceManager.updateWithoutAuth(deviceData, socketId, function (errorCode, errorMessage, httpCode, errorDescription, device) {
        let res = {};
        if (errorCode) {
            res.success = false;
            res.message = errorMessage;
        } else {
            res.success = true;
            res.id = device.id;
            res.accessToken = device.accessToken;
        }
        SocketCtrl.emitMessage(socketId, 'status', res);
    });
};

exports.sendCmd = function (sid, command, data) {
    if (sid) {
        SocketCtrl.emitMessage(sid, command, data);
    }
};
