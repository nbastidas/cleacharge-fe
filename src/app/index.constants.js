/* global moment:false, malarkey:false, __env:false*/
(function() {
  'use strict';

  angular
    .module('app')
    .constant("CONSTANT", { })
    .factory('__env', function($window)
    {
      var res = {};
      angular.extend(res, $window.__env);
      res.enableDebug = true;
      return res;
    });
})();
