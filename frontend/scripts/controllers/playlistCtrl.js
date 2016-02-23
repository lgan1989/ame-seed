'use strict';


angular.module('ameCloudMusicApp')
.controller('PlaylistCtrl', ['$scope', 'APIService', '$stateParams', function($scope, APIService, $stateParams) {

    var playlistId = $stateParams.id;

    APIService.getPlaylistById(playlistId).then(function(result){
        $scope.playlist = result;
    });

}]);
