'use strict';

// Declare app level module which depends on views, and components
angular.module('ameCloudMusicApp', [
        'ui.router',
        'anim-in-out',
        'ngAnimate',
        'ngMaterial',
        'ame.helpers.ElectronHelper',
        'ame.managers.UserManager',
        'ame.directives.AmeSidebar',
        'ame.directives.ImageAnimate'
]).
  config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/partials/login'
    });
    $stateProvider.state('main', {
        url: '/',
        templateUrl: '/partials/main'
    });

    $locationProvider.html5Mode(true);
}]);
