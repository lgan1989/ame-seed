'use strict';

// Declare app level module which depends on views, and components
angular.module('ameCloudMusicApp', [
        'ui.router',
        'anim-in-out',
        'ngAnimate',
        'ngMaterial',
        'ngMdIcons',
        'ame.helpers.ElectronHelper',
        'ame.managers.UserManager',
        'ame.managers.AudioManager',
        'ame.services.APIService',
        'ame.directives.AmeSidebar',
        'ame.directives.ImageAnimate',
        'ame.directives.AmeComponent',
        'ame.directives.AudioVisualizer',
        'ame.directives.SongList',
        'ame.directives.MusicCollection',
        'ame.directives.AudioPlayer'
]).
  config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/partials/login'
    });
    $stateProvider.state('main', {
        abstract: true,
        url: '/content',
        templateUrl: '/partials/main'
    });

    $stateProvider.state('main.recommend', {
        url: '/recommend',
        templateUrl: '/partials/recommend'
    });

    $stateProvider.state('main.collection', {
        url: '/collection',
        templateUrl: '/partials/collection'
    });

    $stateProvider.state('main.playlist', {
        url: '/playlist/:id',
        templateUrl: '/partials/playlist',
        controller: 'PlaylistCtrl'
    });

    $locationProvider.html5Mode(true);
}]);
