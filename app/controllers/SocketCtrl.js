/**
 * Created by bioz on 1/13/2017.
 */

'use strict';

const Md5 = require('md5');
const SocketIO = require('socket.io');
const SocketManager = require('../manager/SocketManager.js');
const Config = require('../config/Global');

/* For redis server
const oSocketIORedis = require('socket.io-redis');
const oRedis = require('redis');
let gOSPub = null;
let gOSSub = null;
*/

let gOSIo = null;
let gRootSockIo = null;

const handleClient = function (socket) {
    socket.on('sync.config', function (deviceData) {
        console.log('sync.config - ' + socket.id + ': ' + deviceData);
        SocketManager.updateCurrentInfo(deviceData, socket.id);
    });
    socket.on('message', (data) => {
        console.log(data);
    });
    socket.on('disconnect', function () {
        SocketManager.updateLiveStatusToOffline(socket.id);
    });
};

const socketAuth = function socketAuth(socket, next){
    try {
        if (socket && socket.request && socket.handshake) {
            const query = socket.handshake.query || socket.request.query || socket.request._query || '';
            if (query && query.token) {
                const tokenParts = Buffer.from(query.token, 'base64').toString().split('.');
                const utcServer = Date.now();
                const utcClient = Number(tokenParts[0]);

                const utcDiff = Math.abs( utcServer - utcClient );

                // expired time is 1 hour
                if(  utcDiff > 3600000 ){
                    return next(new Error('Time out'));
                }else{
                    const sToken =  Md5(tokenParts[0] + Config.sockIOAuthKey);
                    if(sToken !== tokenParts[1]){
                        return next(new Error('Fail Authenticate'));
                    }else{
                        return next();
                    }
                }
            }
        } else {
            return next(new Error('Nothing Defined'));
        }
    }catch(error){
        return next(new Error(error));
    }
};

exports.startSIO = function (server) {
        gOSIo = SocketIO.listen(server);
/*  For Redis Server
        gOSPub = oRedis.createClient({port: Config.redis.port, host: Config.redis.host, auth_pass: Config.redis.password,
            retry_strategy: function (options) {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with
                    // a individual error
                    return new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    // with a individual error
                    return new Error('Retry time exhausted');
                }
                if (options.attempt > 10) {
                    // End reconnecting with built in error
                    return undefined;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            }
        });
        gOSSub = oRedis.createClient({port: Config.redis.port, host: Config.redis.host, auth_pass: Config.redis.password,
            retry_strategy: function (options) {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with
                    // a individual error
                    return new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    // with a individual error
                    return new Error('Retry time exhausted');
                }
                if (options.attempt > 10) {
                    // End reconnecting with built in error
                    return undefined;
                }
                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            }
        });
        gOSIo.adapter(oSocketIORedis({pubClient: gOSPub, subClient: gOSSub, withChannelMultiplexing: true }));
*/
        gRootSockIo = gOSIo.of('/');
        //gOSIo.use(socketAuth);
        gRootSockIo.on('connection', handleClient);
        gOSIo.set('log level', 0);
        return gOSIo;
};

/**
 * Send the message through socket.io to client
 * 
 * @param {any} sid : socket id 
 */
exports.emitMessage = function (sid) {
    try {
        if (gOSIo && gOSIo.sockets && gOSIo.sockets.sockets[sid]) {
            let args = Array.prototype.slice.call(arguments, 1);
            gOSIo.sockets.sockets[sid].emit.apply(gOSIo.sockets.sockets[sid], args);
        }
/* For redis server
        else{
            let args = Array.prototype.slice.call(arguments, 1);
            gRootSockIo.to(sid).emit(args[0], args[1]);
        }
*/
    }catch(error){
        console.log(error);
    }
};
