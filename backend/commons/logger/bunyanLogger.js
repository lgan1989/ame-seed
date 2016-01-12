// <BEGIN FILE DESCRIPTION>
//  {
//    "description" : "Exposes the log module [https://www.npmjs.com/package/bunyan]. Require this file in order to be able to log (debug, errors etc)."
//  }
// <END FILE DESCRIPTION>

'use strict';

var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);
var logger = {
    name: 'AMECloudMusic Logger',
    src: true,
    streams: [{
        level: 'trace',
        type: 'raw',
        stream: prettyStdOut,
        serializers: bunyan.stdSerializers
    }]
};
var log = bunyan.createLogger(logger);

log.info('Bunyan Config', logger);

module.exports = log;
