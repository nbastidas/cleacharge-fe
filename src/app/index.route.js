(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider
  ) {

    $stateProvider
      .state('dashboard', {
        url: '/',
        controller: 'DashboardController',
        controllerAs: 'vm',
        templateUrl: 'app/dashboard/dashboard.html'
      });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }

})();
