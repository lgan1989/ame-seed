'use strict';


angular.module('ameCloudMusicApp')
.controller('MainCtrl', ['$scope', 'UserManager', '$state', 'ElectronHelper', '$mdSidenav', function($scope, UserManager, $state, electron, $mdSidenav) {

    electron.setWindowSize(1024, 800, false);

    UserManager.getUserInfo().then(function(userInfo){
        if (userInfo){
            $scope.userInfo = userInfo;
        }
        else{
            $state.go('login');
        }
    });

    $scope.toggleSidebar = function(){
        var id = 'sidebar';
        return $mdSidenav(id).toggle();
    };

    $scope.login = function(){
        $state.go('login');
    };

}]);
