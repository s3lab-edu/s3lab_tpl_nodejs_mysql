/**
 * Created by bioz on 1/13/2017.
 */
// third party components

// our components
const book = require('../models/book.model');
const rest = require('../utils/restware.util');

module.exports = {
    create: function(req, res) {
        try {
            const query = {};
            query.created_by = req.body.accessAccountId;
            query.updated_by = req.body.accessAccountId;
            query.title = req.body.title;
            query.category = req.body.category;
            query.author = req.body.author;
            query.parts = req.body.parts;

            book.create(query).then((result)=>{
                'use strict';
                return rest.sendSuccessOne(res, result, 200);
            }).catch(function(error) {
                'use strict';
                console.log(error);
                return rest.sendError(res, 1, 'create_book_fail', 400, error);
            });
        } catch (error) {
            console.log(error);
            return rest.sendError(res, 1, 'create_book_fail', 400, error);
        }
    },

    getOne: function(req, res) {
        const id = req.params.id || '';
        try {
            const attributes = ['id', 'title', 'category', 'author', 'parts', 'created_at', 'updated_at', 'created_by', 'updated_by'];

            const where = {id: id};

            book.findOne({
                where: where,
                attributes: attributes,
                raw: true,
            }).then((result)=>{
                'use strict';
                if (result) {
                    return rest.sendSuccessOne(res, result, 200);
                } else {
                    return rest.sendError(res, 1, 'unavailable_book', 400);
                }
            });
        } catch (error) {
            return rest.sendError(res, 400, 'get_book_fail', 400, error);
        }
    },

    getAll: function(req, res) {
        const query = req.query || '';
        try {
            const where = {};
            let page = 1;
            let perPage = 10;
            const sort = [];
            const offset = perPage * (page - 1);

            book.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset,
                order: sort,
                raw: true,
            })
                .then((data) => {
                    const pages = Math.ceil(data.count / perPage);
                    const output = {
                        data: data.rows,
                        pages: {
                            current: page,
                            prev: page - 1,
                            hasPrev: false,
                            next: (page + 1) > pages ? 0 : (page + 1),
                            hasNext: false,
                            total: pages,
                        },
                        items: {
                            begin: ((page * perPage) - perPage) + 1,
                            end: page * perPage,
                            total: data.count,
                        },
                    };
                    output.pages.hasNext = (output.pages.next !== 0);
                    output.pages.hasPrev = (output.pages.prev !== 0);
                    return rest.sendSuccessMany(res, output, 200);
                }).catch(function(error) {
                return rest.sendError(res, 1, 'get_list_book_fail', 400, error);
            });
        } catch (error) {
            return rest.sendError(res, 1, 'get_list_book_fail', 400, error);
        }
    },

    update: function(req, res) {
        try {
            const query = {};
            query.updated_by = req.body.accessAccountId;
            if (req.body.title) {
                query.title = req.body.title;
            }
            if (req.body.category) {
                query.category = req.body.category;
            }
            if (req.body.author) {
                query.author = req.body.author;
            }
            if (req.body.parts) {
                query.parts = req.body.parts;
            }
            const where = {id: req.params.id};

            book.update(
                query,
                {where: where,
                    returning: true,
                    plain: true}).then((result)=>{
                'use strict';
                if ( (result) && (result.length === 2) ) {
                    return rest.sendSuccessOne(res, {id: req.params.id}, 200);
                } else {
                    return rest.sendError(res, 1, 'update_book_fail', 400, null);
                }
            }).catch(function(error) {
                'use strict';
                console.log(error);
                return rest.sendError(res, 1, 'update_book_fail', 400, error);
            });
        } catch (error) {
            console.log(error);
            return rest.sendError(res, 1, 'update_book_fail', 400, error);
        }
    },

    delete: function(req, res) {
        try {
            const where = {id: req.params.id};

            book.destroy(
                {where: where}).then((result)=>{
                'use strict';
                if (result >= 1) {
                    return rest.sendSuccessOne(res, {id: req.params.id}, 200);
                } else {
                    return rest.sendError(res, 1, 'delete_book_fail', 400, null);
                }
            }).catch(function(error) {
                'use strict';
                return rest.sendError(res, 1, 'delete_book_fail', 400, error);
            });
        } catch (error) {
            return rest.sendError(res, 1, 'delete_book_fail', 400, error);
        }
    }
};

