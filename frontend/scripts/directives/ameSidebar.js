'use strict';
angular.module('ame.directives.AmeSidebar', [])
.controller('SidebarCtrl', ['$scope', 'UserManager', function($scope, UserManager) {

    UserManager.getUserInfo().then(function(userInfo){
        if (userInfo){
            $scope.avatar = userInfo.profile.avatarUrl;
            $scope.nickname = userInfo.profile.nickname;
        }
    });
    
    $scope.menuItems = [
    {
        label: '私人FM',
        url: ''
    },
    {
        label: '推荐',
        url: ''
    },
    {
        label: '歌单',
        url: ''
    }
    ];

}])
.directive('ameSidebar', [function($mdSidenav) {
    return {
        controller: 'SidebarCtrl',
        restrict: 'E',
        replace: true,
        templateUrl: '/partials/directives/ameSidebar',
        link: function(scope, elem) {
            // empty
        }
    };
}])
.directive('sidebarButton', ['$mdSidenav', function($mdSidenav) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem) {
            elem.bind('click', function(){
                $mdSidenav('sidebar').close();
            });
        }
    };
}]);
