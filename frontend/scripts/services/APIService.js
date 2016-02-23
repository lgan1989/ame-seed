/**
 *  API service
 */

'use strict';

angular.module('ame.services.APIService', [])
    .service('APIService', ['$http', '$q',
        function($http, $q) {

            var host = 'http://music.163.com';
            var API_PALYLIST = '/api/playlist/detail';

            var getPlaylistById = function(id){
                return $http({
                    method: 'GET',
                    url: host + API_PALYLIST,
                    params: {id: id}
                }).then(function(response){
                    if (response.status === 200 && response.data){
                        return response.data.result;
                    }
                    else{
                        return $q.reject();
                    }
                });
            };

            return {
                getPlaylistById: getPlaylistById
            };
        }
    ]);
