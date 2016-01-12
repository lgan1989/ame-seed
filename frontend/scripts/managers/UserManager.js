/**
 *  Manager for user data.
 */

'use strict';

angular.module('ame.managers.UserManager', [])
    .service('UserManager', ['$q', '$rootScope', 'ElectronHelper',
        function($q, $rootScope, electron) {

            var userInfo;

            var getUserInfo = function(forceRefresh){
                if (userInfo && !forceRefresh){
                    return $q.when(userInfo);
                }
                return $q.when(userInfo);
            };

            var setUserInfo = function(data){
                userInfo = {
                    account: data.account,
                    profile: data.profile,
                    bindlins: data.bindings
                };
            };

            var login = function(credential){

                var deferred = $q.defer();
                electron.onMessage(electron.events.EVENT_LOGIN_RESPONSE, function(evt, response){
                    if (response && response.code === 200){
                        setUserInfo(response);
                        deferred.resolve(userInfo);
                    }
                    else{
                        deferred.reject(response);
                    }
                });
                electron.sendMessage(electron.events.EVENT_LOGIN, credential);
                return deferred.promise;
            };

            return {
                getUserInfo: getUserInfo,
                setUserInfo: setUserInfo,
                login: login
            };
        }
    ]);
