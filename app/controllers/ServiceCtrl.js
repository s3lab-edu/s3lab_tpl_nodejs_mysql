/**
 * Created by bioz on 1/13/2017.
 */
// third party components
const Request = require('request');
const FindRemoveSync = require('find-remove');

// our components
const Restware = require('../utils/Restware');
const Pieces = require('../utils/Pieces');
const Config = require('../config/Global');


module.exports = {

    /////// GET

    proxy: function (req, res) {
        try {
            const orgUrl = req.query.url || '';

            if(!Pieces.VariableBaseTypeChecking(orgUrl, 'string')){
                return Restware.sendError(res, 461, "invalid url", 400);
            }
            let url = decodeURI(orgUrl);
            if(url){
                req.pipe(Request(url, function(error, response, body){
                    if (error){
                        throw error;
                    }
                })).pipe(res);
            }else{
                return Restware.sendError(res, 500, "proxy fail", 500);
            }
        }catch(error){
            return Restware.sendError(res, 500, "system", 500, error);
        }
    },
    cleanTmpTask: function(){
        console.log('Clean TMP JOB Start: ' + Date());

        const CronJob = require('cron').CronJob;
        // every 6 hours
        new CronJob('0 0 */6 * * *', function() {
                try {
                    console.log('Clean TMP JOB: ' + Date());
                    const path = global.CLOUD_API.rootPath + Config.paths.tmp;
                    let result = FindRemoveSync(path, {age: {seconds: 1800}, dir: "*", files: '*.*', limit: 100});
                    if(result === null || Object.keys(result).length <= 0){
                        console.log('Clean TMP JOB: No file to delete');
                    }
                }catch(error){
                    console.log('CleanTMPError: ' + error);
                }
            }, function(){
                console.log('Clean TMP JOB Stop: '+Date());
            },
            true,
            'America/Los_Angeles'
        );
    }
};