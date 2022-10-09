/**
 * Created by s3lab. on 1/13/2017.
 */

// our components
const ServiceCtrl = require('../controllers/ServiceCtrl');

module.exports = function (app) {

    ServiceCtrl.cleanTmpTask();
    app.get('/v1/auth/services/proxy', ServiceCtrl.proxy);
    app.get('/v1/services/proxy', ServiceCtrl.proxy);
};