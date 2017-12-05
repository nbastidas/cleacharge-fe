(function() {
  'use strict';
  angular.module('app')
    .filter('questionFilter', questionFilter);

  /**@ngInject**/
  function questionFilter(){
    return function(items, category) {
      var filtered = items.filter(function(item) {
        if(category === item.category) {
          return item;
        }
      });
      return filtered;
    }
  }
})();
