'use strict';
angular.module('amceMessageProcessor.directives.processedMessageTab', [])
.controller('ProcessedMessageTabCtrl', ['$scope', 'amceService', function($scope, amceService) {

    $scope.processed = amceService.getProcessed();
    $scope.order = 'id';

    $scope.$on('processed.updated', () => {
        $scope.processed = amceService.getProcessed();
    });

}])
.directive('processedMessageTab', [function() {
    return {
        controller: 'ProcessedMessageTabCtrl',
        restrict: 'E',
        replace: true,
        templateUrl: '/partials/directives/processedMessageTab',
        link: function() {
            // empty
        }
    };
}]);
