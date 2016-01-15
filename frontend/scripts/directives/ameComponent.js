'use strict';
angular.module('ame.directives.AmeComponent', [])
.directive('songItem', ['AudioManager', function(AudioManager) {
    return {
        restrict: 'A',
        replace: false,
        controller: 'SongListCtrl',
        link: function(scope, elem, attrs) {
            // empty

            scope.toggleFavorite = function(){
                scope.item.starred = !scope.item.starred;
            };

            var artists = '';
            if (scope.item.artists){
                var arr = [];
                scope.item.artists.every(function(artist){
                    arr.push(artist.name);
                });
                artists = arr.join(',');
            }
            scope.item.subtitle = artists;
        }
    };
}]);
