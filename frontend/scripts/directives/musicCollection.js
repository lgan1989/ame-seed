'use strict';


angular.module('ame.directives.MusicCollection', [])
.directive('musicCollection', [function() {
    return {
        restrict: 'E',
        replace: true,
        scope:{
            collection: '='
        },
        templateUrl: '/partials/directives/musicCollection',
        link: function() {
            // empty
        }
    };
}]);

