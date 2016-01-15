'use strict';
angular.module('ame.directives.ImageAnimate', [])
.directive('imageZoomIn', [function() {
    return {
        restrict: 'A',
        replace: false,
        link: function(scope, elem, attrs) {
            // empty

            elem.bind('load', function(){
                elem.addClass('image-animate-zoom-in');
                elem.css('display' , 'block');
            });
        }
    };
}])
.directive('iconButtonShakeOnHover', [function() {
    return {
        restrict: 'A',
        replace: false,
        link: function(scope, elem, attrs) {
            // empty
            elem.addClass('image-animate-shake-on-hover');
        }
    };
}]);
