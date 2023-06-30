const Rest = require('../utils/restware');
module.exports = {
    getAll: function (req, res) {
        const out = { title: 'categories', id: 'all'};
        return Rest.sendSuccessOne(res, out, 200);
    },

    getOne: function (req, res) {
        let id = req.params.id || '';
        res.send('categories: ' + id);
    },
};
