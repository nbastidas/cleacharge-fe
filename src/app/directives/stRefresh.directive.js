(function () {
  'use strict';

  angular
    .module('app')
    .directive('refreshTable', refreshTableController);

  /** @ngInject */
  function refreshTableController() {
      return {
        require:'stTable',
        restrict: 'A',
        link:function(scope,elem,attr,table){
            scope.$on('refreshTable', function() {
                table.pipe(table.tableState());
            });
        }
      };
  }
})();

