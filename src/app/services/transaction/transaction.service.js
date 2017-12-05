(function(){
    'use strict';
  
    angular.module('app')
      .factory('TransactionService', TransactionService);
  
    /**@ngInject**/
    function TransactionService(
      $http,
      RequestHandler,
      Upload
    ){
  
      var service = this;
  
      service.submit = function(description, postalCode){
  
        var body = '';
  
        body = {
          description: description ? description : '',
          postalCode: postalCode ? postalCode : ''
        };
        
        return $http.post(
          __env.apiUrl + 'transactions',
          body
        ).then(
          RequestHandler.success,
          RequestHandler.error
        );
      };
      
      service.send = function (files) {
        var config =
        {
          url: __env.apiUrl + 'transactions/batch',
          arrayKey: '',
          data:{
            files: files
          }
        };
  
        return Upload.upload(config)
        .then(
          RequestHandler.success,
          RequestHandler.error
        );
      };

      return service;
  
    }
  })();