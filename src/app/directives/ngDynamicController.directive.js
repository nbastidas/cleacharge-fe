(function () {
  'use strict';

  angular
    .module('app')
    .directive('ngDynamicController', ngDynamicController);

  /** @ngInject */
  function ngDynamicController($compile) {

    var directive = {
      scope: {
        name: '=ngDynamicController',
        view: '=view',
        data: '=data'
      },
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function(scope, elem) {
        if (
          angular.isDefined(scope.view)
          && scope.view !== ''
          && angular.isDefined(scope.name)
          && scope.name !== ''
        ){
          elem.attr('ng-include', "'"+ scope.view +"'");
          elem.attr('ng-controller', scope.name + ' as vm');
          elem.removeAttr('ng-dynamic-controller');
          $compile(elem)(scope);
        }
      }
    };

    return directive;

  }
})();

