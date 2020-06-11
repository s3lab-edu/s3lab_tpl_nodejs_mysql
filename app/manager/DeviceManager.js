/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Validator = require('validator');
const JsonWebToken = require('jsonwebtoken');

// our components
const Constant = require('../utils/Constant');
const Device = require('../models/Device');
const SocketManager = require('./SocketManager');
const Pieces = require('../utils/Pieces');
const Config = require('../config/Global');
const User = require('../models/User.js');

exports.create = function (accessUserId, accessUserRight, accessUserName, code, name, callback) {
    try {
        if ( !Pieces.VariableBaseTypeChecking(code,'string') ) {
            return callback(2, 'invalid_device_code', 400, 'code is not a string', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(name,'string')
                || !Validator.isAlphanumeric(name)
                || !Validator.isLength(name, {min: 4, max: 128}) ) {
            return callback(2, 'invalid_device_name', 400, 'name is not alphanumeric and 4 - 128 characters', null);
        }

        let queryObj = {};
        queryObj.code = code;
        queryObj.creator = accessUserId;
        queryObj.updater = accessUserId;
        queryObj.name = name;

        queryObj.activated = Constant.ACTIVATED.YES;
        queryObj.deleted = Constant.DELETED.NO;

        Device.create(queryObj).then(device=>{
            "use strict";
            return callback(null, null, 200, null, device);

        }).catch(function(error){
            "use strict";
            return callback(2, 'create_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'create_device_fail', 400, error, null);
    }
};

exports.notifySync = function (accessUserId, accessUserType, siteCode, companyCode, type, callback) {
    try {
        let where = {};

        if ( !Pieces.VariableBaseTypeChecking(siteCode,'string') ) {
            return callback(2, 'invalid_device_site_code', 400, 'code is not a string', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(companyCode,'string') ) {
            return callback(2, 'invalid_device_company_code', 400, 'code is not a string', null);
        }

        if ( !Pieces.VariableEnumChecking(type, Constant.CONTENT_TYPE_ENUM) ) {
            return callback(2, 'invalid_device_source_type', 400, 'source type is not a string', null);
        }

        if ( accessUserType < Constant.USER_TYPE.MODERATOR ){
            where.createdBy = accessUserId;
        }

        where.deleted = { $ne: Constant.DELETED.YES };
        where.isAlive = true;

        if(siteCode !== Constant.CONTENT_TYPE_ENUM[0]) {
            where.siteCode = siteCode;
        }

        if(companyCode !== Constant.CONTENT_TYPE_ENUM[0]){
            where.companyCode = companyCode;
        }
        Device.findAll({
            //attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
            where: where,
            limit: 200
        }).then((devices) => {
            let result = {};
            if(devices !== null && devices.length > 0){
                for(let i = 0; i < devices.length; i++){
                    if(Pieces.VariableBaseTypeChecking(devices[i].socketIO,'string')){
                        let data = {};
                        data.type = type;
                        SocketManager.sendCmd(devices[i].socketIO, 'notifySync', data);
                    }
                }
                result.success = true;
                result.device = devices.length;
                return callback(null, null, 200, null, result);
            }else{
                result.success = false;
                result.device = 0;
                return callback(null, null, 200, null, result);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_all_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'notify_sync_device_fail', 400, error, null);
    }
};

exports.notifyUpgrade = function (accessUserId, accessUserType, id, callback) {
    try {
        let where = {};

        if ( (id !== Constant.CONTENT_TYPE_ENUM[0])
            && !( Pieces.VariableBaseTypeChecking(id,'string') && Validator.isInt(id) )
            && !Pieces.VariableBaseTypeChecking(id,'number') ){
            return callback(2, 'invalid_device_id', 400, 'device id is incorrect', null);
        }

        if (accessUserType < Constant.USER_TYPE.MODERATOR){
            where.createdBy = accessUserId;
        }

        where.deleted = { $ne: Constant.DELETED.YES };
        where.isAlive = true;

        if(id !== Constant.CONTENT_TYPE_ENUM[0]) {
            where.id = id;
        }

        Device.findAll({
            //attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
            where: where,
            limit: 200
        }).then((devices) => {
            let result = {};
            if(devices !== null && devices.length > 0){
                for(let i = 0; i < devices.length; i++){
                    if(Pieces.VariableBaseTypeChecking(devices[i].socketIO,'string')){
                        let data = {};
                        SocketManager.sendCmd(devices[i].socketIO, 'notifyUpgrade', data);
                    }
                }
                result.success = true;
                result.device = devices.length;
                return callback(null, null, 200, null, result);
            }else{
                result.success = false;
                result.device = 0;
                return callback(null, null, 200, null, result);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_all_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'notify_upgrade_device_fail', 400, error, null);
    }
};


/////// GET

exports.getOne = function (accessUserId, accessUserType, Id, callback) {
    try {
        if ( !( Pieces.VariableBaseTypeChecking(Id,'string')
                && Validator.isInt(Id) )
            && !Pieces.VariableBaseTypeChecking(Id,'number') ){
            return callback(2, 'invalid_device_id', 400, 'device id is incorrect', null);
        }

        let where = {};
        //let attributes;

        if( accessUserType <= Constant.USER_TYPE.MODERATOR ){
            where.createdBy = accessUserId;
            where.deleted = { $ne: Constant.DELETED.YES };
        }

        where.id = Id;

        Device.findOne({where:where}).then(device=>{
            "use strict";
            if(device){
                return callback(null, null, 200, null, device);
            }else{
                return callback(2, 'find_one_device_fail', 404, null, null);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'get_one_device_fail', 400, error, null);
    }
};

exports.getStatistic = function (accessUserId, accessUserType, callback) {
    try {
        let final = {};
        let where = {};
        final = {activated: 0, total: 0};

        if( accessUserType < Constant.USER_TYPE.MODERATOR ){
            return callback(null, null, 200, null, final);
        }

        Device.count({
            where:where,
        }).then(function(total){
            "use strict";
            final.total = total;
            where.activated = Constant.ACTIVATED.YES;
            Device.count({
                where:where,
            }).then(function(activated){
                final.activated = activated;
                return callback(null, null, 200, null, final);
            }).catch(function(error){
                "use strict";
                return callback(2, 'count_device_fail', 400, error, null);
            });
        }).catch(function(error){
            "use strict";
            return callback(2, 'count_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'statistic_device_fail', 400, error, null);
    }
};

exports.getAll = function (accessUserId, accessUserType, accessUserName, queryContent, callback) {
    try {
        let where = {};
        let page = 1;
        let perPage = Constant.DEFAULT_PAGING_SIZE;
        let sort = [];
        //let attributes = [];


        if(accessUserType <= Constant.USER_TYPE.END_USER){
            where.createdBy = accessUserId;
            where.deleted = { $ne: Constant.DELETED.YES };
        }

        this.parseFilter(accessUserId, accessUserType, where, queryContent.filter);
        if( Pieces.VariableBaseTypeChecking(queryContent.q, 'string') ){
            where.name = {[Sequelize.Op.like]: queryContent.q};
        }

        if( (Pieces.VariableBaseTypeChecking(queryContent['page'], 'string') && Validator.isInt(queryContent['page']))
            || (Pieces.VariableBaseTypeChecking(queryContent['page'], 'number')) ){
            page = parseInt(queryContent['page']);
            if(page === 0){
                page = 1;
            }
        }

        if( (Pieces.VariableBaseTypeChecking(queryContent['perPage'], 'string') && Validator.isInt(queryContent['perPage']))
            || (Pieces.VariableBaseTypeChecking(queryContent['perPage'], 'number')) ){
            perPage = parseInt(queryContent['perPage']);
            if(perPage <= 0){
                perPage = Constant.DEFAULT_PAGING_SIZE;
            }
        }

        Pieces.splitAndAssignValueForSort(sort, queryContent['sort']);
        if(sort.length <= 0){
            sort.push(['updatedAt', 'DESC']);
        }

        let offset = perPage * (page - 1);
        Device.findAndCountAll({
            where: where,
            //attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
            limit: perPage,
            offset: offset,
            order: sort
            }).then((data) => {
                let pages = Math.ceil(data.count / perPage);
                let devices = data.rows;
                let output = {
                    data: devices,
                    pages: {
                        current: page,
                        prev: page - 1,
                        hasPrev: false,
                        next: (page + 1) > pages ? 0 : (page + 1),
                        hasNext: false,
                        total: pages
                    },
                    items: {
                        begin: ((page * perPage) - perPage) + 1,
                        end: page * perPage,
                        total: data.count
                    }
                };
                output.pages.hasNext = (output.pages.next !== 0);
                output.pages.hasPrev = (output.pages.prev !== 0);
                return callback(null, null, 200, null, output);
            }).catch(function (error) {
                return callback(2, 'find_count_all_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'get_all_device_fail', 400, error, null);
    }
};


exports.update = function (accessUserId, accessUserType, deviceId, deviceData, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(deviceId,'string')
                && Validator.isInt(deviceId) )
            && !Pieces.VariableBaseTypeChecking(deviceId,'number') ){
            return callback(2, 'invalid_device_id', 400, 'device id is incorrect', null);
        }

        if ( !deviceData ) {
            return callback(2, 'invalid_device_data', 400, null);
        }

        if (accessUserType < Constant.USER_TYPE.MODERATOR){
            where.createdBy = accessUserId;
            where.deleted = { $ne: Constant.DELETED.YES };
        }

        where.id = deviceId;

        queryObj.updater=accessUserId;
        queryObj.updatedAt = new Date();

        if ( deviceData.deleted === Constant.DELETED.YES ||  deviceData.deleted === Constant.DELETED.NO ) {
            queryObj.deleted = deviceData.deleted;
        }

        if ( Pieces.VariableBaseTypeChecking(deviceData.code, 'string') ) {
            queryObj.code = deviceData.code;
        }

        if( Pieces.VariableBaseTypeChecking(deviceData.name, 'string')
            && Validator.isLength(deviceData.name, {min: 4, max: 128}) ){
            queryObj.name = deviceData.name;
        }

        if (Pieces.VariableBaseTypeChecking(deviceData.desc,'string') ) {
            queryObj.desc = deviceData.desc;
        }

        // config.general
        if (Pieces.VariableBaseTypeChecking(deviceData.adminPassword, 'string')) {
            queryObj.adminPassword = deviceData.adminPassword;
        }
        if (( Pieces.VariableBaseTypeChecking(deviceData.isFullscreen, 'string') && Validator.isBoolean(deviceData.isFullscreen))
            || Pieces.VariableBaseTypeChecking(deviceData.isFullscreen, 'boolean')) {
            queryObj.isFullscreen = deviceData.isFullscreen;
        }
        // config.general.extCode
        if (Pieces.VariableBaseTypeChecking(deviceData.companyCode, 'string')) {
            queryObj.companyCode = deviceData.companyCode;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.siteCode, 'string')) {
            queryObj.siteCode = deviceData.siteCode;
        }
        // config.general.timer
        if (Pieces.VariableBaseTypeChecking(deviceData.autoShutdownTime, 'number')) {
            queryObj.autoShutdownTime = deviceData.autoShutdownTime;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.autoShutdownTimeMode, 'number')) {
            queryObj.autoShutdownTimeMode = deviceData.autoShutdownTimeMode;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.productModeTime, 'number')) {
            queryObj.productModeTime = deviceData.productModeTime;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.previewTime, 'number')) {
            queryObj.previewTime = deviceData.previewTime;
        }

        // config.mirror
        if (Pieces.VariableBaseTypeChecking(deviceData.countdownTime, 'number')) {
            queryObj.countdownTime = deviceData.countdownTime;
        }
        if (( Pieces.VariableBaseTypeChecking(deviceData.isNeedOpenHelp, 'string') && Validator.isBoolean(deviceData.isNeedOpenHelp))
            || Pieces.VariableBaseTypeChecking(deviceData.isNeedOpenHelp, 'boolean')) {
            queryObj.isNeedOpenHelp = deviceData.isNeedOpenHelp;
        }

        // config.device.sensor
        if (Pieces.VariableBaseTypeChecking(deviceData.comName, 'string')) {
            queryObj.comName = deviceData.comName;
        }
        if (( Pieces.VariableBaseTypeChecking(deviceData.isMovementEnable, 'string') && Validator.isBoolean(deviceData.isMovementEnable))
            || Pieces.VariableBaseTypeChecking(deviceData.isMovementEnable, 'boolean')) {
            queryObj.isMovementEnable = deviceData.isMovementEnable;
        }
        if (( Pieces.VariableBaseTypeChecking(deviceData.isIrEnable, 'string') && Validator.isBoolean(deviceData.isIrEnable))
            || Pieces.VariableBaseTypeChecking(deviceData.isIrEnable, 'boolean')) {
            queryObj.isIrEnable = deviceData.isIrEnable;
        }

        // config.device.camera
        if (Pieces.VariableBaseTypeChecking(deviceData.resolution, 'string')) {
            queryObj.resolution = deviceData.resolution;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.camera, 'string')) {
            queryObj.camera = deviceData.camera;
        }
        if (Pieces.VariableBaseTypeChecking(deviceData.rotate, 'number')) {
            queryObj.rotate = deviceData.rotate;
        }

        // config.development
        if (( Pieces.VariableBaseTypeChecking(deviceData.isDebugToolOpened, 'string') && Validator.isBoolean(deviceData.isDebugToolOpened))
            || Pieces.VariableBaseTypeChecking(deviceData.isDebugToolOpened, 'boolean')) {
            queryObj.isDebugToolOpened = deviceData.isDebugToolOpened;
        }
        if (( Pieces.VariableBaseTypeChecking(deviceData.isCamInfoDisplayed, 'string') && Validator.isBoolean(deviceData.isCamInfoDisplayed))
            || Pieces.VariableBaseTypeChecking(deviceData.isCamInfoDisplayed, 'boolean')) {
            queryObj.isCamInfoDisplayed = deviceData.isCamInfoDisplayed;
        }

        Device.findOne({where: where}).then(device=>{
            "use strict";
            if(device){
                Device.update(
                    queryObj,
                    {where: where}).then(result=>{
                    if(result !== null && result.length > 0 && result[0] > 0){
                        if(Pieces.VariableBaseTypeChecking(device.socketIO,  'string')){
                            let data = {};
                            if(queryObj.name && queryObj.name !== device.name){
                                data.name = queryObj.name;
                            }
                            if(queryObj.desc && queryObj.desc !== device.desc){
                                data.desc = queryObj.desc;
                            }
                            data.config = {};
                            data.config.general = {};
                            // config.general
                            if(queryObj.adminPassword && queryObj.adminPassword !== device.adminPassword){
                                data.config.general.adminPassword = queryObj.adminPassword;
                            }
                            if(queryObj.isFullscreen !== null && queryObj.isFullscreen !== device.isFullscreen){
                                data.config.general.isAppFullscreen = queryObj.isFullscreen;
                            }
                            data.config.general.extCode = {};
                            if(queryObj.companyCode && queryObj.companyCode !== device.companyCode){
                                data.config.general.extCode.company = queryObj.companyCode;
                            }
                            if(queryObj.siteCode !== null && queryObj.siteCode !== device.siteCode){
                                data.config.general.extCode.site = queryObj.siteCode;
                            }
                            data.config.general.timer = {};
                            if(queryObj.autoShutdownTime && queryObj.autoShutdownTime !== device.autoShutdownTime){
                                data.config.general.timer.endTime = queryObj.autoShutdownTime;
                            }
                            if(queryObj.autoShutdownTimeMode && queryObj.autoShutdownTimeMode !== device.autoShutdownTimeMode){
                                data.config.general.timer.modeTime = queryObj.autoShutdownTimeMode;
                            }
                            if(queryObj.productModeTime && queryObj.productModeTime !== device.productModeTime){
                                data.config.general.timer.barcodeTime = queryObj.productModeTime;
                            }
                            if(queryObj.previewTime && queryObj.previewTime !== device.previewTime){
                                data.config.general.timer.previewTime = queryObj.previewTime;
                            }

                            data.config.mirror = {};
                            if(queryObj.countdownTime && queryObj.countdownTime !== device.countdownTime){
                                data.config.mirror.countDownTime = queryObj.countdownTime;
                            }
                            if(queryObj.isNeedOpenHelp && queryObj.isNeedOpenHelp !== device.isNeedOpenHelp){
                                data.config.mirror.isNeedOpenHelp = queryObj.isNeedOpenHelp;
                            }

                            data.config.development = {};
                            if(queryObj.isDebugToolOpened && queryObj.isDebugToolOpened !== device.isDebugToolOpened){
                                data.config.development.isDebugToolOpened = queryObj.isDebugToolOpened;
                            }
                            if(queryObj.isCamInfoDisplayed && queryObj.isCamInfoDisplayed !== device.isCamInfoDisplayed){
                                data.config.development.isCamInfoDisplayed = queryObj.isCamInfoDisplayed;
                            }

                            data.config.device = {};
                            data.config.device.camera = {};
                            if(queryObj.resolution && queryObj.resolution !== device.resolution){
                                data.config.device.camera.resolution = queryObj.resolution;
                            }
                            if(queryObj.camera && queryObj.camera !== device.camera){
                                data.config.device.camera.device = queryObj.camera;
                            }
                            if(queryObj.rotate && queryObj.rotate !== device.rotate){
                                data.config.device.camera.rotate = queryObj.rotate;
                            }

                            data.config.device.sensor = {};
                            if(queryObj.comName && queryObj.comName !== device.comName){
                                data.config.device.sensor.port = queryObj.comName;
                            }
                            if(queryObj.isMovementEnabled && queryObj.isMovementEnabled !== device.isMovementEnabled){
                                data.config.device.sensor.isMovementEnabled = queryObj.isMovementEnabled;
                            }
                            if(queryObj.isIrEnabled && queryObj.isIrEnabled !== device.isIrEnabled){
                                data.config.device.sensor.isIrEnabled = queryObj.isIrEnabled;
                            }

                            SocketManager.sendCmd(device.socketIO, 'updateSetting', data);
                        }
                        return callback(null, null, 200, null, deviceId);
                    }else{
                        return callback(2, 'invalid_device', 400, null, null);
                    }
                }).catch(function(error){
                    "use strict";
                    return callback(2, 'update_device_fail', 400, error, null);
                });
            }else{
                return callback(2, 'invalid_device', 400, null, null);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'update_device_fail', 400, error);
    }
};

// support SocketIO disconnect or connect
exports.updateLiveStatus = function (socketId, isAlive, callback) {
    try {
        let where = { socketIO:  socketId};
        let queryObj = {};
        queryObj.isAlive = isAlive;

        if(isAlive === true){
            queryObj.socketIO = socketId;
        }else{
            queryObj.socketIO = '';
        }

        Device.update(queryObj, {
            where:where
        }).then(device=>{
            "use strict";
            if(device && device[0] > 0){
                return callback(null);
            }else{
                return callback("unavailable_device");
            }
        }).catch(function(error){
            "use strict";
            return callback('update_device_fail');
        });
    }catch(error){
        return callback(error);
    }
};


exports.updateWithoutAuth = function (deviceData, socketIO, callback) {
    try {
        if ( !deviceData ) {
            return callback( 2, 'invalid_device_data', 400, 'device data is empty', null);
        }

        if ( !Pieces.VariableBaseTypeChecking(deviceData,'string')
            || !Validator.isJSON(deviceData) ) {
            return callback( 2, 'invalid_device_data', 400, 'device data is empty', null);
        }

        let oDeviceData = Pieces.safelyParseJSON1(deviceData);

        if ( !Pieces.VariableBaseTypeChecking(oDeviceData.code, 'string') ) {
            return callback( 2, 'invalid_device_code', 400, 'code is not a string', null);
        }

        let queryObj = {};

        if( Pieces.VariableBaseTypeChecking(oDeviceData.name, 'string')
                && Validator.isLength(oDeviceData.name, {min: 4, max: 128}) ){
            queryObj.name = oDeviceData.name;
        }

        if (Pieces.VariableBaseTypeChecking(oDeviceData.desc,'string') ) {
            queryObj.desc = oDeviceData.desc;
        }

        // config
        if(oDeviceData.config) {
            // config.general
            if(oDeviceData.config.general){
                if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.adminPassword, 'string')) {
                    queryObj.adminPassword = oDeviceData.config.general.adminPassword;
                }
                if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.general.isAppFullscreen, 'string') && Validator.isBoolean(oDeviceData.config.general.isAppFullscreen))
                    || Pieces.VariableBaseTypeChecking(oDeviceData.config.general.isAppFullscreen, 'boolean')) {
                    queryObj.isFullscreen = oDeviceData.config.general.isAppFullscreen;
                }

                if(oDeviceData.config.general.extCode){
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.extCode.company, 'string')) {
                        queryObj.companyCode = oDeviceData.config.general.extCode.company;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.extCode.site, 'string')) {
                        queryObj.siteCode = oDeviceData.config.general.extCode.site;
                    }
                }

                if(oDeviceData.config.general.timer){
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.timer.endTime, 'number')) {
                        queryObj.autoShutdownTime = oDeviceData.config.general.timer.endTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.timer.modeTime, 'number')) {
                        queryObj.autoShutdownTimeMode = oDeviceData.config.general.timer.modeTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.timer.barcodeTime, 'number')) {
                        queryObj.productModeTime = oDeviceData.config.general.timer.barcodeTime;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.general.timer.previewTime, 'number')) {
                        queryObj.previewTime = oDeviceData.config.general.timer.previewTime;
                    }
                }
            }

            if(oDeviceData.config.development){
                if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.development.isDebugToolOpened, 'string') && Validator.isBoolean(oDeviceData.config.development.isDebugToolOpened))
                    || Pieces.VariableBaseTypeChecking(oDeviceData.config.development.isDebugToolOpened, 'boolean')) {
                    queryObj.isDebugToolOpened = oDeviceData.config.development.isDebugToolOpened;
                }

                if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.development.isCamInfoDisplayed, 'string') && Validator.isBoolean(oDeviceData.config.development.isCamInfoDisplayed))
                    || Pieces.VariableBaseTypeChecking(oDeviceData.config.development.isCamInfoDisplayed, 'boolean')) {
                    queryObj.isCamInfoDisplayed = oDeviceData.config.development.isCamInfoDisplayed;
                }
            }

            if(oDeviceData.config.mirror){
                if (Pieces.VariableBaseTypeChecking(oDeviceData.config.mirror.countDownTime, 'number')) {
                    queryObj.countdownTime = oDeviceData.config.mirror.countDownTime;
                }
                if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.mirror.isNeedOpenHelp, 'string') && Validator.isBoolean(oDeviceData.config.mirror.isNeedOpenHelp))
                    || Pieces.VariableBaseTypeChecking(oDeviceData.config.mirror.isNeedOpenHelp, 'boolean')) {
                    queryObj.isNeedOpenHelp = oDeviceData.config.mirror.isNeedOpenHelp;
                }
            }

            if(oDeviceData.config.device){
                if(oDeviceData.config.device.camera){
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.device.camera.resolution, 'string')) {
                        queryObj.resolution = oDeviceData.config.device.camera.resolution;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.device.camera.device, 'string')) {
                        queryObj.camera = oDeviceData.config.device.camera.device;
                    }
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.device.camera.rotate, 'number')) {
                        queryObj.rotate = oDeviceData.config.device.camera.rotate;
                    }
                }
                if(oDeviceData.config.device.sensor){
                    if (Pieces.VariableBaseTypeChecking(oDeviceData.config.device.sensor.port, 'string')) {
                        queryObj.comName = oDeviceData.config.device.sensor.port;
                    }
                    if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.device.sensor.isMovementEnabled, 'string') && Validator.isBoolean(oDeviceData.config.device.sensor.isMovementEnabled))
                        || Pieces.VariableBaseTypeChecking(oDeviceData.config.device.sensor.isMovementEnabled, 'boolean')) {
                        queryObj.isMovementEnable = oDeviceData.config.device.sensor.isMovementEnabled;
                    }
                    if (( Pieces.VariableBaseTypeChecking(oDeviceData.config.device.sensor.isIrEnabled, 'string') && Validator.isBoolean(oDeviceData.config.device.sensor.isIrEnabled))
                        || Pieces.VariableBaseTypeChecking(oDeviceData.config.device.sensor.isIrEnabled, 'boolean')) {
                        queryObj.isIrEnable = oDeviceData.config.device.sensor.isIrEnabled;
                    }
                }
            }
        }

        // configOptions
        if(oDeviceData.configOptions) {
            if ( oDeviceData.configOptions.sensors ) {
                queryObj.sensors = JSON.stringify(oDeviceData.configOptions.sensors);
            }

            if ( oDeviceData.configOptions.webcams ) {
                queryObj.webcams = JSON.stringify(oDeviceData.configOptions.webcams);
            }
        }

        if(Pieces.VariableBaseTypeChecking(socketIO, 'string')){
            queryObj.socketIO = socketIO;
            queryObj.isAlive = true;
        }

        queryObj.updatedAt = new Date();
        queryObj.code = oDeviceData.code;


        let where = { code:  oDeviceData.code};
        Device.findOne({
            where:where
        }).then(device=>{
            if(device){
                device.update(queryObj).then(record=>{
                    User.findOne({
                        where: {id: device.createdBy}
                    }).then(account=>{
                        "use strict";
                        if(account){
                            JsonWebToken.sign({ id: account.id, username: account.username, displayName: account.displayName, type: account.type, applyFor: 'DEVICE' }, Config.jwtAuthKey, {}, function(error, token) {
                                if(error)
                                {
                                    return callback(2, 'create_token_fail', 400, error, null);
                                }else{
                                    device.accessToken = token;
                                    return callback( null, null, 200, null, device);
                                }
                            });
                        }else{
                            return callback(2, 'invalid_account', 403, null, null);
                        }
                    }).catch(function(error){
                        "use strict";
                        return callback(2, 'find_one_account_fail', 403, error, null);
                    });
                }).catch(function(error){
                    "use strict";
                    console.log(error);
                    return callback(2, 'update_device_fail', 403, error, null);
                })
            }
            else{
                queryObj.creator = 1;
                queryObj.updater = 1;
                queryObj.activated = Constant.ACTIVATED.YES;
                Device.create(queryObj).then((device) => {
                    User.findOne({
                        where: {id: 1}
                    }).then(account=>{
                        "use strict";
                        if(account){
                            JsonWebToken.sign({ id: account.id, username: account.username, displayName: account.displayName, type: account.type, applyFor: 'DEVICE' }, Config.jwtAuthKey, {}, function(error, token) {
                                if(error)
                                {
                                    return callback(2, 'create_token_fail', 500, error, null);
                                }else{
                                    device.accessToken = token;
                                    return callback( null, null, 200, null, device);
                                }
                            });
                        }else{
                            return callback(2, 'invalid_account', 403, null, null);
                        }
                    }).catch(function(error){
                        "use strict";
                        return callback(2, 'find_one_account_fail', 403, error, null);
                    });
                }).catch(function(error){
                    "use strict";
                    return callback(2, 'create_device_fail', 403, error, null);
                })
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_device_fail', 403, error, null);
        });
    }catch(error){
        return callback(2, 'update_without_auth_device_fail', 400, error, null);
    }
};




/////// DELETE

exports.delete = function (accessUserId, accessUserRight, deviceId, callback) {
    try {
        let queryObj = {};
        let where = {};

        if ( !( Pieces.VariableBaseTypeChecking(deviceId,'string')
                && Validator.isInt(deviceId) )
            && !Pieces.VariableBaseTypeChecking(deviceId,'number') ){
            return callback(2, 'invalid_device_id', 400, 'device id is incorrect', null);
        }

        if( accessUserRight <= Constant.USER_TYPE.MODERATOR ){
            where.createdBy = accessUserId;
        }
        where = { id: deviceId };
        queryObj = { deleted: Constant.DELETED.YES };

        Device.findOne({where:where}).then(device=>{
            "use strict";
            if ( device && device.deleted === Constant.DELETED.YES ){
                Device.destroy({where: where}).then(result => {
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(2, 'remove_device_fail', 420, error);
                });
            }else {
                Device.update(queryObj, {where: where}).then(result=>{
                    "use strict";
                    return callback(null, null, 200, null);
                }).catch(function(error){
                    return callback(2, 'update_device_fail', 420, error);
                })
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'find_one_device_fail', 400, error, null);
        });
    }catch(error){
        return callback(2, 'delete_device_fail', 400, error);
    }
};

exports.deletes = function (accessUserId, accessUserRight, idList, callback) {
    try {
        let where = {};
        let queryObj = {};

        if ( !Pieces.VariableBaseTypeChecking(idList,'string')
                || !Validator.isJSON(idList) ) {
            return callback(2, 'invalid_device_ids', 400, 'device id list is not a json array string');
        }
        if(accessUserRight <= Constant.USER_TYPE.MODERATOR){
            where.createdBy = accessUserId;
        }

        let idLists = Pieces.safelyParseJSON(idList);
        where.id = {$in: idLists};
        queryObj.deleted = Constant.DELETED.YES;

        Device.update(queryObj, {where: where}).then(result=>{
            "use strict";
            if ( result && (result.length > 0) && result[0] > 0 ) {
                return callback(null, null, 200, null);
            } else {
                return callback(2, 'invalid_device', 404, null);
            }
        }).catch(function(error){
            "use strict";
            return callback(2, 'update_device_fail', 420, error);
        });
    }catch(error){
        return callback(2, 'deletes_device_fail', 400, error);
    }
};


// --------- others ----------
exports.parseFilter = function (accessUserId, accessUserRight, condition, filters) {
    try {
        if ( !Pieces.VariableBaseTypeChecking(filters,'string')
                || !Validator.isJSON(filters) ) {
            return false;
        }

        let aDataFilter = Pieces.safelyParseJSON1(filters);
        if( aDataFilter && (aDataFilter.length > 0) ){
            for(let i = 0; i < aDataFilter.length; i++ ){
                if ( !Pieces.VariableBaseTypeChecking(aDataFilter[i].key, 'string')
                    || !Pieces.VariableBaseTypeChecking(aDataFilter[i].operator, 'string')
                    || aDataFilter[i].value === null
                    || aDataFilter[i].value === undefined ){
                    continue;
                }

                if ( aDataFilter[i].key === 'deleted'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=') )
                    && (aDataFilter[i].value === Constant.DELETED.YES || aDataFilter[i].value === Constant.DELETED.NO) ) {
                    switch(aDataFilter[i].operator){
                        case '=':
                            condition[aDataFilter[i].key] = aDataFilter[i].value;
                            break;
                        case '!=':
                            condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                            break;
                    }
                    continue;
                }

                if ( aDataFilter[i].key === 'owner'
                    && aDataFilter[i].operator === '='
                    && aDataFilter[i].value === 'mine' ){
                    condition['createdBy'] = accessUserId;
                    continue;
                }

                if ( aDataFilter[i].key === 'createdAt'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=')
                        || (aDataFilter[i].operator === '<') || (aDataFilter[i].operator === '>')
                        || (aDataFilter[i].operator === '<=') || (aDataFilter[i].operator === '>=')
                        || (aDataFilter[i].operator === 'in'))
                ) {
                    if( aDataFilter[i].operator !== 'in'
                        && Pieces.VariableBaseTypeChecking(aDataFilter[i].value, 'string')
                        && Validator.isISO8601(aDataFilter[i].value) ){
                        switch(aDataFilter[i].operator){
                            case '=':
                                condition[aDataFilter[i].key] = {$eq: aDataFilter[i].value};
                                break;
                            case '!=':
                                condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                                break;
                            case '>':
                                condition[aDataFilter[i].key] = {$gt: aDataFilter[i].value};
                                break;
                            case '>=':
                                condition[aDataFilter[i].key] = {$gte: aDataFilter[i].value};
                                break;
                            case '<':
                                condition[aDataFilter[i].key] = {$lt: aDataFilter[i].value};
                                break;
                            case '<=':
                                condition[aDataFilter[i].key] = {$lte: aDataFilter[i].value};
                                break;
                        }
                    }else if(aDataFilter[i].operator === 'in'){
                        if(aDataFilter[i].value.length === 2
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[0], 'string')
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[1], 'string')
                            && Validator.isISO8601(aDataFilter[i].value[0])
                            && Validator.isISO8601(aDataFilter[i].value[1]) ){
                            condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value[0], $lte: aDataFilter[i].value[1] };
                        }
                    }
                    continue;
                }

                if ( aDataFilter[i].key === 'updatedAt'
                    && ( (aDataFilter[i].operator === '=') || (aDataFilter[i].operator === '!=')
                        || (aDataFilter[i].operator === '<') || (aDataFilter[i].operator === '>')
                        || (aDataFilter[i].operator === '<=') || (aDataFilter[i].operator === '>=')
                        || (aDataFilter[i].operator === 'in') )
                ) {
                    if( aDataFilter[i].operator !== 'in'
                        && Pieces.VariableBaseTypeChecking(aDataFilter[i].value, 'string')
                        && Validator.isISO8601(aDataFilter[i].value) ){
                        switch(aDataFilter[i].operator){
                            case '=':
                                condition[aDataFilter[i].key] = {$eq: aDataFilter[i].value};
                                break;
                            case '!=':
                                condition[aDataFilter[i].key] = {$ne: aDataFilter[i].value};
                                break;
                            case '>':
                                condition[aDataFilter[i].key] = {$gt: aDataFilter[i].value};
                                break;
                            case '>=':
                                condition[aDataFilter[i].key] = {$gte: aDataFilter[i].value};
                                break;
                            case '<':
                                condition[aDataFilter[i].key] = {$lt: aDataFilter[i].value};
                                break;
                            case '<=':
                                condition[aDataFilter[i].key] = {$lte: aDataFilter[i].value};
                                break;
                        }
                    }else if(aDataFilter[i].operator === 'in'){
                        if(aDataFilter[i].value.length === 2
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[0], 'string')
                            && Pieces.VariableBaseTypeChecking(aDataFilter[i].value[1], 'string')
                            && Validator.isISO8601(aDataFilter[i].value[0])
                            && Validator.isISO8601(aDataFilter[i].value[1]) ){
                            condition[aDataFilter[i].key] = { $gte: aDataFilter[i].value[0], $lte: aDataFilter[i].value[1] };
                        }
                    }
                }
            }
        }else{
            return false;
        }
    }catch (error){
        return false;
    }
};

