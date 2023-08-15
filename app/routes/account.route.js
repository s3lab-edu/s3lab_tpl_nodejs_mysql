/**
 * Created by bioz on 1/13/2017.
 */
// our components
const accountService = require('../services/account.service');

module.exports = function (app) {
    app.get('/api/v1/auth/accounts', accountService.getAll);
    /**
     * @api {GET} /api/v1/accounts/:id Get One
     * @apiVersion 0.4.0
     * @apiName getOne
     * @apiGroup Accounts
     * @apiPermission Every type of user
     *
     * @apiDescription Get one account
     *
     * @apiParam {string} id ID of account, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/api/v1/accounts/2
     *
     * @apiSuccess {String} id the ID of account
     * @apiSuccess {String} title title of account
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2",
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
    app.get('/api/v1/auth/accounts/:id', accountService.getOne);
    app.post('/api/v1/accounts/login', accountService.login);
    app.post('/api/v1/accounts/register', accountService.register);
    /**
     * @api {POST} /api/v1/accounts Create One
     * @apiVersion 0.4.0
     * @apiName createOne
     * @apiGroup Accounts
     * @apiPermission Every type of user
     *
     * @apiDescription Create one account
     *
     * @apiBody {String} login_name the unique name of user for login
     * @apiBody {String} full_name the name of user.
     * @apiBody {String} password password of user
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/api/v1/accounts
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2",
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
    app.post('/api/v1/auth/accounts', accountService.create);
    app.put('/api/v1/auth/accounts/:id', accountService.update);
    app.put('/api/v1/auth/accounts', accountService.updates);
    app.delete('/api/v1/auth/accounts/:id', accountService.delete);
    app.delete('/api/v1/auth/accounts', accountService.deletes);
};
