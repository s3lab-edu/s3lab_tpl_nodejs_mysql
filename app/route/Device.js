/*
 * Created by s3lab. on 1/13/2017.
 */
// our components
const DeviceCtrl = require('../controllers/DeviceCtrl');

module.exports = function (app) {
    /**
     * @api {POST} /v1/auth/devices Create a Device
     * @apiVersion 1.0.0
     * @apiName Create_Device
     * @apiGroup Device
     * @apiPermission Every of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Create a device by every one
     *
     * @apiParam {string}  a unique id int with 6 <= length <= 64
     * @apiParam {string} a unique code string with length <= 64
     *
     * @apiExample Example usage:
     * curl -i https://conntomysql.herokuapp.com/v1/auth/devices
     *
     * @apiSuccess {String} id the device is the data of device
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *     "data": {},
     *     "message": "",
     *     "result": "ok"
     *      }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     */
    app.post('/v1/auth/devices', DeviceCtrl.create);
    /**
     * @api {GET} /v1/auth/devices/:id Get_A_Device
     * @apiVersion 1.0.0
     * @apiName get_a_Device
     * @apiGroup Device
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get a device
     *
     * @apiParam {string} id of the device, on params
     *
     * @apiExample Example usage:
     * curl -i https://conntomysql.herokuapp.com/v1/auth/devices/3
     *
     * @apiSuccess {Int} id the ID of a device
     * @apiSuccess {Char} code login name of a device
     * @apiSuccess {String} name display name of a device
     * @apiSuccess {String} desc description of device
     * @apiSuccess {Bool} isAlive describe state of a device
     * @apiSuccess {Int} createdBy display people who created the device
     * @apiSuccess {Int} updatedBy display people who updated the device
     * @apiSuccess {Date} createdAt display the day when it was created
     * @apiSuccess {Date} updatedAt display the day when it was updated
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "3",
     *              "code": "dv002",
     *              "name": "router",
     *              "desc": "null",
     *              ...
     *          },
     *          "result": "ok",
     *          "message" ""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/v1/auth/devices/:id', DeviceCtrl.getOne);
    /**
     * @api {GET} /v1/auth/devices Get List Of Devices
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Device
     * @apiPermission Moderator, administrator, super admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Get all devices
     *
     * @apiParam {Number} page Page which we want to get (N/A)
     * @apiParam {Number} perPage Item per page (N/A)
     * @apiParam {String} sort Sort the list by a field (N/A)
     * @apiParam {String} filter filter the query data (N/A)
     * @apiParam {String} q Text filter for data (N/A)
     *
     * @apiExample Example usage:
     * curl -i https://conntomysql.herokuapp.com/v1/auth/devices
     *
     * @apiSuccess {Object[]} data the list of data
     * @apiSuccess {Object} items {begin, end, total}
     * @apiSuccess {Object} pages {current, prev, hasPrev, next, hasNext, total}
     * @apiSuccess {String} result ok or fail
     * @apiSuccess {String} message something from server
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data": [...],
     *       "items": {"begin": 1, "end": 3, "total": 5},
     *       "pages": {"current": 1, "prev": 3, "hasPrev": true, "next": 5, "hasNext": true, "total": 56},
     *       "result": "ok",
     *       "message": ""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid input"
     *     }
     */
    app.get('/v1/auth/devices', DeviceCtrl.getAll); //
    /**
     * @api {PUT} /v1/auth/devices/:id Update a Device
     * @apiVersion 1.0.0
     * @apiName update
     * @apiGroup Device
     * @apiPermission Moderator, Administrator, Super Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription Update a device information
     *
     * @apiParam {String} id ID of a device, on params
     * @apiParam {char(5)} code Code of a device
     * @apiParam {String} name Name of a device
     * @apiParam {String} desc Description of a device
     * @apiParam {Bool} isAlive that is status of a device
     *
     * @apiExample Example usage:
     * curl -i https://conntomysql.herokuapp.com/v1/auth/devices/5
     *
     * @apiSuccess {String} id the ID of updated a device
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2"
     *          },
     *          "result":"ok",
     *          "message":""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.put('/v1/auth/devices/:id', DeviceCtrl.update);
    /**
     * @api {DELETE} /v1/auth/devices/:id Delete a Device
     * @apiVersion 1.0.0
     * @apiName delete
     * @apiGroup Device
     * @apiPermission Moderator, Administrator, Super Admin
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription delete a device
     *
     * @apiParam {String} id ID of a Device
     *
     * @apiExample Example usage:
     * curl -i https://conntomysql.herokuapp.com/v1/auth/devices/3
     *
     * @apiSuccess {String} id Id of a deleted device
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2"
     *          },
     *          "result":"ok",
     *          "message":""
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.delete('/v1/auth/devices/:id', DeviceCtrl.delete);
};
