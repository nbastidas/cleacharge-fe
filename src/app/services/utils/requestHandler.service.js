(function(){
  'use strict';

  angular
    .module('app')
    .factory('RequestHandler', RequestHandler);

  /**@ngInject**/
  function RequestHandler($log, __env){
    var vm = this;
    _init();

    function _init(){
      vm.verbose = __env.enableDebug;
      vm.name = '';
    }

    function message(name) {
      vm.name = name || '';
    }

    function success(response){
      if (response.$promise) {
        response.data = {
          success: response.success,
          message: response.message,
          remaining: response.remaining
        };
      }

      if (angular.isArray(response)){
        response = {
          'data': {
            'array': response
          }
        };
      }
      if (vm.verbose){
        $log.info('Successful request ' + vm.name + ' responded: ' + response);
      }

      response.data = response.data || {};

      if (angular.isUndefined(response.data.success)){
        response.data.success = true;
      }
      return response.data;
    }

    function error(response){
      if (vm.verbose){
        var text = response.status > 0 ?
          ', HTTP code: ' + response.status :
          ', it might be a CORS problem';
        $log.error('Unexpected error ' + vm.name + text,
          response.errors ? response.errors : '');
      }

      response.success = false;
      return response;
    }

    return {
      message: message,
      error: error,
      success: success
    };
  }
})();
