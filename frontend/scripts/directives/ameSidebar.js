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
        state: 'main.fm'
    },
    {
        label: '今日推荐',
        state: 'main.recommend'
    },
    {
        label: '歌单列表',
        state: 'main.list'
    }
    ];


}])
.directive('ameSidebar', [function() {
    return {
        controller: 'SidebarCtrl',
        restrict: 'E',
        replace: true,
        templateUrl: '/partials/directives/ameSidebar',
        link: function() {
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
