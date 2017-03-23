'use strict';

// Declare app level module which depends on views, and components
angular.module('amceMessageProcessor', [
    'ui.router',
    'ngMaterial',
    'md.data.table',
    'amceMessageProcessor.directives.todoMessageTab',
    'amceMessageProcessor.directives.processedMessageTab',
    'amceMessageProcessor.services.amceService'
]).
  config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/partials/dashboard'
    });

    $locationProvider.html5Mode(true);
}]);
