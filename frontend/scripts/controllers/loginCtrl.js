'use strict';


angular.module('ameCloudMusicApp')
.controller('LoginCtrl', ['$scope', 'UserManager', '$state', 'ElectronHelper', function($scope, UserManager, $state, electron) {


    $scope.user = {
        username: '',
        password: ''
    };

    //$scope.login = function(){
        UserManager.login($scope.user).then(function(){
            $state.go('main.collection');
        });
    //};
}]);
