// <BEGIN FILE DESCRIPTION>
//  {
//    "description": [
//      "Wrapper around [https://www.npmjs.org/package/request] to make it promise-based instead of ",
//      "using callbacks. Used for all communication with external APIs."
//    ]
//  }
// <END FILE DESCRIPTION>

'use strict';

var request = require('request');
var $q = require('q');
var path = require('path');
var log = require(path.resolve('backend/commons/logger/bunyanLogger'));
var config = require(path.resolve('backend/config'));


var header = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'music.163.com',
    'Referer': 'http://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0'
};

/**
 * Wraps request and basic error handling.
 *
 * @param deferred the promise object to answer to.
 * @param opts the options object for request.
 */
function wrapRequest(deferred, opts) {

    var before = Date.now(),
        info = ' ' + opts.method + ' ' + opts.url;

    opts.timeout = config.timeout;
    opts.headers = header;
    opts.gzip = true;
    log.trace(opts);
    request(opts, function (error, response, body) {
        if (error || (response.statusCode < 200 || response.statusCode >= 400 )) {
            log.error(info + ' FAILED (' + (Date.now() - before) + 'ms)');
            deferred.reject({error: error, response: response, body: body});
        } else {
            log.info(info + ' ' + response.statusCode + '(' + (Date.now() - before) + 'ms)');
            deferred.resolve({response: response, body: body});
        }
    });
}

/**
 * Convenience GET request function.
 *
 * @param url the url to send the request to.
 * @param opts the options object, optional, see documentation of https://www.npmjs.org/package/request
 * @returns {Promise.promise|*} a promise
 */
function get(url, opts) {
    var deferred = $q.defer();
    if (!opts) {
        opts = {};
    }

    opts.url = url;
    opts.method = 'GET';

    wrapRequest(deferred, opts);

    return deferred.promise;
}

/**
 * Convenience POST request function.
 *
 * @param url the url to send the request to.
 * @param opts the options object, optional, see documentation of https://www.npmjs.org/package/request
 * @param body request body.
 *
 * @returns {Promise.promise|*} a promise
 */
function post(url, body, opts) {
    var deferred = $q.defer();
    if (!opts) {
        opts = {};
    }
    opts.url = url;
    opts.method = 'POST';
    opts.body = body || ' ';

    console.log(opts);

    wrapRequest(deferred, opts);

    return deferred.promise;
}

/**
 * Convenience DELETE request function.
 *
 * @param url the url to send the request to.
 * @param opts the options object, optional, see documentation of https://www.npmjs.org/package/request
 * @returns {Promise.promise|*} a promise
 */
function _delete(url, opts) {
    var deferred = $q.defer();
    if (!opts) {
        opts = {};
    }
    opts.url = url;
    opts.method = 'DELETE';

    wrapRequest(deferred, opts);
    return deferred.promise;
}

/**
 * Convenience PUT request function.
 *
 * @param url the url to send the request to.
 * @param opts the options object, optional, see documentation of https://www.npmjs.org/package/request
 * @param body request body.
 * @returns {Promise.promise|*} a promise
 */
function put(url, body, opts) {
    var deferred = $q.defer();
    if (!opts) {
        opts = {};
    }
    opts.url = url;
    opts.method = 'PUT';
    opts.body = body || ' ';

    wrapRequest(deferred, opts);

    return deferred.promise;
}

/**
 * Convenience PATCH request function.
 *
 * @param url the url to send the request to.
 * @param opts the options object, optional, see documentation of https://www.npmjs.org/package/request
 * @param body request body.
 * @returns {Promise.promise|*} a promise
 */
function patch(url, body, opts) {
    var deferred = $q.defer();
    if (!opts) {
        opts = {};
    }
    opts.url = url;
    opts.method = 'PATCH';
    opts.body = body || ' ';

    wrapRequest(deferred, opts);

    return deferred.promise;
}

/**
 * Raw request object. This method gives you full access to the options object.
 *
 * @param opts the options object.
 * @returns {Promise.promise|*} a promise.
 */
function rawRequest(opts) {
    var deferred = $q.defer();
    wrapRequest(deferred, opts);
    return deferred.promise;
}

exports.get = get;
exports.post = post;
exports['delete'] = _delete;
exports.put = put;
exports.patch = patch;
exports.request = rawRequest;
