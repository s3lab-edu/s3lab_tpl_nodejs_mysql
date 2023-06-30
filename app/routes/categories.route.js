/**
 * Created by bioz on 1/13/2017.
 */
// our components
const categoriesService = require('../services/categories.service');

module.exports = function (app) {
    app.get('/api/v1/categories', categoriesService.getAll);
    /**
     * @api {GET} /api/v1/categories/:id Get One
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Categories
     * @apiPermission Every type of user
     *
     * @apiDescription Get one category
     *
     * @apiParam {string} id ID of category, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/api/v1/categories/2
     *
     * @apiSuccess {String} id the ID of category
     * @apiSuccess {String} title title of category
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data":{
     *              "id": "2",
     *              "title": "bioz",
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
    app.get('/api/v1/categories/:id', categoriesService.getOne);
};
