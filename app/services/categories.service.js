module.exports = {
    getAll: function (req, res) {
        const out = { title: 'categories', id: 'all'};
        res.status(200);
        res.contentType('json');
        return res.json(out);
    },

    getOne: function (req, res) {
        let id = req.params.id || '';
        res.send('categories: ' + id);
    },
};
