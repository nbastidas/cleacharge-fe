(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */

  function config(
    stConfig,
    $logProvider,
    $localStorageProvider,
    $sessionStorageProvider,
    ScrollBarsProvider,
    __envProvider
  ) {

    // Enable log
    $logProvider.debugEnabled(true);

    // SmartTables
    stConfig.pagination.template = 'app/components/pagination/pagination.html';
    stConfig.pagination.itemsByPage = 10;

    // LocalStorage Settings
    var appCommonPrefix = 'rich_';
    $localStorageProvider.setKeyPrefix(appCommonPrefix);
    $sessionStorageProvider.setKeyPrefix(appCommonPrefix);
    $localStorageProvider.set('transactions', []);
    $localStorageProvider.set('transactionsFailed', 0); 
    $localStorageProvider.set('transactionsProcessed', 0);    

    // Scrollbar
    ScrollBarsProvider.defaults = {
      scrollButtons: {
        scrollAmount: 'auto', // scroll amount when button pressed
        enable: true // enable scrolling buttons by default
      },
      scrollInertia: 400, // adjust however you want
      axis: 'yx', // enable 2 axis scrollbars by default,
      theme: 'dark-3',
      autoHideScrollbar: true,
      advanced:{
        updateOnContentResize: true
      }
    };
  }

})();
