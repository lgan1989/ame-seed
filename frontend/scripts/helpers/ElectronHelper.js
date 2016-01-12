/**
 * Electron related functions
 */

'use strict';

angular.module('ame.helpers.ElectronHelper', [])
    .service('ElectronHelper', [
        function() {
            const ipcRenderer = require('electron').ipcRenderer;

            const events = {
                EVENT_LOGIN : 'login',
                EVENT_LOGIN_RESPONSE : 'login-response'
            };

            var sendMessage = function(chanel, message) {
                ipcRenderer.send(chanel, message);
            };

            var onMessage = function() {
                ipcRenderer.on.apply(ipcRenderer, arguments);
            };

            var setWindowSize = function(width, height, isFixed) {
                ipcRenderer.send('set-window-size', width, height, isFixed);
            };

            return {
                sendMessage: sendMessage,
                onMessage: onMessage,
                setWindowSize: setWindowSize,
                events: events

            };
        }
    ]);
