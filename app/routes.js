/**
 * Created by s3lab. on 1/13/2017.
 */
module.exports = function (app) {
    require('./route/User')(app);
    require('./route/Device')(app);
    require('./route/Service')(app);
};
