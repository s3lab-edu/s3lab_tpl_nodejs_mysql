/**
 * Created by bioz on 1/13/2017.
 */
// our components
const accountService = require('../services/account.service');

module.exports = function (app) {
    app.get('/api/v1/accounts', accountService.getAll);
    app.get('/api/v1/accounts/:id', accountService.getOne);
    app.post('/api/v1/accounts/register', accountService.register);
    app.post('/api/v1/accounts', accountService.create);
    app.put('/api/v1/accounts/:id', accountService.update);
    app.put('/api/v1/accounts', accountService.updates);
    app.delete('/api/v1/accounts/:id', accountService.delete);
    app.delete('/api/v1/accounts', accountService.deletes);
};
