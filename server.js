// third party components
let Express = require('express');
let BodyParser = require('body-parser');
let MethodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan');

let App = Express();

// log by using morgan
App.use(morgan('combined'));
App.use(
    morgan('dev', {
        skip: function(req, res) {
            return res.statusCode < 400;
        },
    }),
);

// parse application/json
App.use(BodyParser.json({
    limit:'5mb'
}));

// parse application/vnd.api+json as json
App.use(BodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
App.use(BodyParser.urlencoded({
    limit:'5mb',
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
App.use(MethodOverride('X-HTTP-Method-Override'));

// support CORS from API
App.use(cors());

// Auth Middleware - This will check if the token is valid
App.all('/api/v1/auth/*', [require('./app/middlewares/auth.middelwares')]);
// Routes ==================================================
require('./app/route')(App); // configure our routes
// Create app
let server = require('http').createServer(App);

// Start app: http://IP_Address:port
const port = 443;
server.listen(port, function () {
    console.log('API V2.1 started to listening on port %d', port);
});

// expose app
module.exports = App;
