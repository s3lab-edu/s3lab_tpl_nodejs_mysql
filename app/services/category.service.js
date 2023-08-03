const rest = require('../utils/restware.util');
const category = require('../models/category.model');
module.exports = {
    getAll: function (req, res) {
        const out = { title: 'categories', id: 'all'};
        return rest.sendSuccessOne(res, out, 200);
    },

    getOne: function (req, res) {
        let id = req.params.id || '';
        res.send('categories: ' + id);
    },

    createOne: function (req, res) {
        try {
            const query = {};
            query.created_by = req.body.accessAccountId;
            query.updated_by = req.body.accessAccountId;
            query.title = req.body.title;

            category.create(query).then((result)=>{
                'use strict';
                return rest.sendSuccessOne(res, result, 200);
            }).catch(function(error) {
                'use strict';
                return rest.sendError(res, 1, 'create_category_fail', 400, error);
            });
        } catch (error) {
            return rest.sendError(res, 1, 'create_category_fail', 400, error);
        }
    },

    updateOne: function (req, res) {
        try {
            const query = {};
            query.updated_by = req.body.accessAccountId;
            query.title = req.body.title;
            const where = {id: req.params.id};

            category.update(
                query,
                {where: where,
                    returning: true,
                    plain: true}).then((result)=>{
                'use strict';
                if ( (result) && (result.length === 2) ) {
                    return rest.sendSuccessOne(res, {id: req.params.id}, 200);
                } else {
                    return rest.sendError(res, 1, 'update_category_fail', 400, null);
                }
            }).catch(function(error) {
                'use strict';
                console.log(error);
                return rest.sendError(res, 1, 'update_category_fail', 400, error);
            });
        } catch (error) {
            console.log(error);
            return rest.sendError(res, 1, 'update_category_fail', 400, error);
        }
    },

    deleteOne: function (req, res) {
        try {
            const where = {id: req.params.id};

            category.destroy(
                {where: where}).then((result)=>{
                'use strict';
                if (result >= 1) {
                    return rest.sendSuccessOne(res, {id: req.params.id}, 200);
                } else {
                    return rest.sendError(res, 1, 'delete_category_fail', 400, null);
                }
            }).catch(function(error) {
                'use strict';
                return rest.sendError(res, 1, 'delete_category_fail', 400, error);
            });
        } catch (error) {
            return rest.sendError(res, 1, 'delete_category_fail', 400, error);
        }
    },
};
