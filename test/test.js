'use strict';

describe('My controller', function() {
    var scope;
    var ctrl;
    beforeEach(module('ameSeedApp'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('SamplePageCtrl', {$scope: scope});
    }));

    it('message should be friendly', function(){
        expect(scope.message.toLowerCase()).to.contain('hello');
    });

    afterEach(function() {
        scope.$destroy();
    });
});
