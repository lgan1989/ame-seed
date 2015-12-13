'use strict';
angular.module('ameSeed.directives.sampleDirective', [])
.controller('SampleDirectiveCtrl', ['$scope', function($scope) {
    $scope.text = 'Angular::MongoDB::Express';

    $scope.items = 
    [
        {
            title: 'Demo',
            link: '#',
            icon: 'fa fa-flask'
        },
        {
            title: 'Github',
            link: 'https://github.com/lgan1989/ame-seed',
            icon: 'fa fa-github'
        }
    ];
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
