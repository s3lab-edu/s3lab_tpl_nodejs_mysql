module.exports = function (app) {
    require('./routes/categories.route')(app);
    require('./routes/account.route')(app);
    require('./routes/book.route')(app);
};
