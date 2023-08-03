/**
 * Created by bioz on 1/13/2017.
 */
// third party components

// our components
const book = require('../models/book.model');
const rest = require('../utils/restware.util');

module.exports = {
    create: function(req, res) {
        const out = { title: 'book', action: 'create'};
        return rest.sendSuccessOne(res, out, 200);
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
        const out = { title: 'book', action: 'update'};
        return rest.sendSuccessOne(res, out, 200);
    },

    delete: function(req, res) {
        const out = { title: 'book', action: 'delete'};
        return rest.sendSuccessOne(res, out, 200);
    }
};

