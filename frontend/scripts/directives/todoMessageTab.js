'use strict';
angular.module('amceMessageProcessor.directives.todoMessageTab', [])
    .controller('TodoMessageTabCtrl', ['$scope', 'amceService', function($scope, amceService)  {

        $scope.todos = amceService.getTodos();
        $scope.gifts = amceService.getGifts();
        $scope.names = amceService.getNames();

        $scope.process = () => {
            if (!$scope.selected || !$scope.selected[0]) {
                return '';
            }
            amceService.processMessage($scope.selected[0].id, $scope.getProcessedContent());
        };

        const init = () => {
            $scope.content = {
                giftIdx: 0,
                birthDate: '',
                name: '',
                searchText: ''
            };
            $scope.selected = [];
            $scope.order = 'id';
        };

        init();

        $scope.$on('todos.updated', () => {
            init();
            $scope.todos = amceService.getTodos();
        });

        $scope.getProcessedContent = () => {
            if (!$scope.selected || !$scope.selected[0]) {
                return '';
            }
            let message = '';
            if ($scope.selected[0].type === 0) {
                const gift = $scope.gifts[$scope.content.giftIdx];
                message = `Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: ${gift.name}. Enjoy.`;
            } else {
                const name = $scope.content.name || {display: ''};
                const birthDate = $scope.content.birthDate;
                const d = birthDate ? new Date(birthDate) : new Date();
                message = `Whooa well done and congratulations on the birth of ${name.display} on ${d.toLocaleDateString()}.`;
            }
            return message;
        };

        $scope.querySearch = (query) => {
            console.log(query);
            const results = query ? $scope.names.filter(createFilterFor(query)) : $scope.names;
            return results;
        };
        /**
         * Create filter function for a query string
         */
        const createFilterFor = (query) => {
            var lowercaseQuery = angular.lowercase(query);

            return (name) => {
                return (name.value.indexOf(lowercaseQuery) === 0);
            };

        }
    }])
    .directive('todoMessageTab', [function() {
        return {
            controller: 'TodoMessageTabCtrl',
            restrict: 'E',
            replace: true,
            templateUrl: '/partials/directives/todoMessageTab',
            link: function() {
                // empty
            }
        };
    }]);
