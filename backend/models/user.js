'use strict';
//var process = require('process');
var crypto = require('./myCrypto');
var restClient = require('../commons/restClient');
var log = require('../commons/logger/bunyanLogger');

exports.login = function(credential) {

    var username = credential.username;
    var password = credential.password;

    log.info('Login Attemp with: [' + username + ']');

    var url, pattern = /^0\d{2,3}\d{7,8}$|^1[34578]\d{9}$/,
        body = {
            password: crypto.MD5(password),
            rememberLogin: 'true'
        };
    if (pattern.test(username)) {
        //手机登录
        body.phone = username;
        url = 'http://music.163.com/weapi/login/cellphone/';
    } else {
        //邮箱登录
        body.username = username;
        url = 'http://music.163.com/weapi/login/';
    }

    var encData = crypto.aesRsaEncrypt(JSON.stringify(body));
    var data = 'params=' + encodeURIComponent(encData.params) + '&' + 'encSecKey=' + encodeURIComponent(encData.encSecKey);
    return restClient.post(url, data).then(function(response) {
        return JSON.parse(response.body);
    });
};
