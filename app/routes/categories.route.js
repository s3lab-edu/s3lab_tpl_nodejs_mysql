/**
 * Created by bioz on 1/13/2017.
 */
// our components
const categoriesService = require('../services/categories.service');

module.exports = function (app) {
    app.get('/api/v1/categories', categoriesService.getAll);
    app.get('/api/v1/categories/:id', categoriesService.getOne);
};
