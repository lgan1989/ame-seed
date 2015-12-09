'use strict';

// Declare app level module which depends on views, and components
angular.module('ameSeed', [
        'ui.router',
        'ameSeed.directives.sampleDirective'
]).
  config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $stateProvider.state('hello', {
        url: '/hello',
        templateUrl: 'partials/samplePage'
    });

    $locationProvider.html5Mode(true);
}]);
