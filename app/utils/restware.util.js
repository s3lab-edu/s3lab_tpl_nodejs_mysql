/**
 * Created by s3lab. on 1/13/2017.
 */
'use strict';
const sendSuccessOne = function(res, data, iHttpCode) {
    if (!res) {
        return;
    }

    const httpStatus = iHttpCode ? iHttpCode : 200;
    const out = {};

    if (data) {
        out.data = data;
    }

    out.message = '';
    out.result = 'ok';

    res.status(httpStatus);
    res.contentType('json');

    return res.json(out);
};

const sendSuccessMany = function(res, data, iHttpCode) {
    if (!res) {
        return;
    }

    const httpStatus = iHttpCode ? iHttpCode : 200;
    let out = {};
    if (data) {
        out = data;
    }

    out.message = '';
    out.result = 'ok';

    res.status(httpStatus);
    res.contentType('json');

    return res.json(out);
};

const sendSuccessWebContent = function(res, data, iHttpCode) {
    if (!res) {
        return;
    }

    const httpStatus = iHttpCode ? iHttpCode : 200;
    let out = {};

    if ( data ) {
        out = data;
    }

    res.status(httpStatus);
    res.contentType('text/html');
    return res.end(out);
};

const sendSuccessToken = function(res, token, payload, message = '') {
    if (!res) {
        return;
    }
    const out = {};
    const data = payload;
    data.token = token;

    out.data = data;
    out.message = message;
    out.result = 'ok';

    res.status(200);
    res.contentType('json');
    return res.json(out);
};

const sendError = function(res, errorCode, errorMes, httpCode, errorDesc, data) {
    if (!res) {
        return;
    }

    const out = {};
    out.result = 'fail';
    out.code = errorCode;
    out.error = errorMes ? errorMes : null;

    if (data) {
        out.data = data;
    }

    out.all = errorDesc;

    const status = httpCode ? httpCode : 500;

    res.status(status);
    res.contentType('json');
    return res.json(out);
};

module.exports = {
    sendSuccessOne,
    sendSuccessMany,
    sendError,
    sendSuccessToken,
    sendSuccessWebContent,
};
