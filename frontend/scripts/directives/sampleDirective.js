'use strict';
angular.module('ameSeed.directives.sampleDirective', [])
.controller('SampleDirectiveCtrl', ['$scope', function($scope) {
    $scope.text = 'Just a directive';
}])
.directive('sampleDirective', [function() {
    return {
        controller: 'SampleDirectiveCtrl',
        restrict: 'E',
        replace: true,
        templateUrl: '/partials/directives/sampleDirective',
        link: function() {
            // empty
        }
    };
}]);
