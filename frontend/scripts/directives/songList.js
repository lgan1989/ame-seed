'use strict';


angular.module('ame.directives.SongList', [])
.controller('SongListCtrl', ['$scope', 'AudioManager', function($scope, AudioManager) {

    $scope.playItem = function(item){
        $scope.listItems.forEach(function(val){
            val.active = false;
        });
        var url = item.mp3Url;
        item.active = true;
        AudioManager.initializeWebAudio(url).then(function(){
            AudioManager.play();
        });
    };

}])
.directive('songList', [function() {
    return {
        controller: 'SongListCtrl',
        restrict: 'E',
        replace: true,
        scope:{
            listItems: '='
        },
        templateUrl: '/partials/directives/songList',
        link: function() {
            // empty
        }
    };
}]);

