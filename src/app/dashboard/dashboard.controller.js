(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(
    $localStorage,
    TransactionService,
    $rootScope
  ) {
    var vm = this;

    function setInitialFunctions(){
      vm.getTransaction = getTransaction;
      vm.updateTable = updateTable;
      vm.uploadCSV = uploadCSV;
    }

    function init(){
      vm.$storage = $localStorage;
      vm.filter = {
        open: true,
        pending: false,
        closed: false
      };
      vm.isLoading = false;
      vm.form = {
        transactionName: '',
        postalCode: ''
      };

      vm.transactions = $localStorage.transactions;
      vm.itemsByPage = 10;
    }

    function getTransaction() {
      TransactionService.submit(vm.form.description, vm.form.postalCode)
        .then(function (response) {
          console.log('res', response);
          
          if (response.success[0]) {
            $localStorage.transactionsProcessed++;
            $localStorage.transactions.push(response);
          } else if (response.message == 'Not Found') {
            $localStorage.transactionsProcessed++;            
            $localStorage.transactionsFailed++;
            $localStorage.transactions.push(response);            
          }
          $rootScope.$broadcast('refreshTable');
        });
    }

    function uploadCSV() {
      TransactionService.send(vm.files)
        .then(function (response) {
          if(response.results){
            var result = response.results.map(function (transaction) {
              var json = JSON.parse(transaction);
              console.log('js', json.success);
              if (json.success) {
                $localStorage.transactionsProcessed++;
                console.log('state', $localStorage.transactionsProcessed);
              } else if (json.message == 'Not Found') {
                $localStorage.transactionsProcessed++;            
                $localStorage.transactionsFailed++;
                console.log('message', $localStorage.transactionsProcessed);                
                
              }
              return json;
            })
            console.log('arra', result);
            $localStorage.transactions = $localStorage.transactions.concat(result);
          }
          $rootScope.$broadcast('refreshTable');
        });
    }

    function updateTable(tableState){
      /**
       * @todo add pagination management using limit and offset
       */
      vm.isLoading = true;
      var pagination = {start: 0 , number: 10};
      var limit;
      var offset;

      pagination = tableState.pagination;
      offset = pagination.start || 0;
      limit = pagination.number || 10;

      vm.transactionsAmount = $localStorage.transactions.length;
      vm.transactions = $localStorage.transactions;      
      tableState.pagination.numberOfPages = Math.ceil($localStorage.transactions.length / pagination.number);
      vm.isLoading = false;
    }

    setInitialFunctions();
    init();
  }
})();
