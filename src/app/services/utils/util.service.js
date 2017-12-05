(function(){
  'use strict';

  angular.module('app')
    .factory('UtilService', UtilService);

  /**@ngInject**/
  function UtilService(
  ){
    var service = this;

    service.searchKey = function(obj, keys){
      var arrayOfkeys = keys.split('.');
      var section = {}
      if (arrayOfkeys.length) {
        section = obj;
        for (var i = 0; i < arrayOfkeys.length; i++) {
          section = section && section.hasOwnProperty(arrayOfkeys[i]) && angular.isDefined(section[arrayOfkeys[i]]) && section[arrayOfkeys[i]];
        }
      }
      return section;
    }


    return service;
  }
})();
