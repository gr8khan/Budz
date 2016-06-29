(function () {
  'use strict';

  angular
    .module('cooks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cooks', {
        abstract: true,
        url: '/cooks',
        template: '<ui-view/>'
      })
      .state('cooks.list', {
        url: '',
        templateUrl: 'modules/cooks/client/views/list-cooks.client.view.html',
        controller: 'CooksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cooks List'
        }
      })
      .state('cooks.create', {
        url: '/create',
        templateUrl: 'modules/cooks/client/views/form-cook.client.view.html',
        controller: 'CooksController',
        controllerAs: 'vm',
        resolve: {
          cookResolve: newCook
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Cooks Create'
        }
      })
      .state('cooks.edit', {
        url: '/:cookId/edit',
        templateUrl: 'modules/cooks/client/views/form-cook.client.view.html',
        controller: 'CooksController',
        controllerAs: 'vm',
        resolve: {
          cookResolve: getCook
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Cook {{ cookResolve.name }}'
        }
      })
      .state('cooks.view', {
        url: '/:cookId',
        templateUrl: 'modules/cooks/client/views/view-cook.client.view.html',
        controller: 'CooksController',
        controllerAs: 'vm',
        resolve: {
          cookResolve: getCook
        },
        data:{
          pageTitle: 'Cook {{ articleResolve.name }}'
        }
      });
  }

  getCook.$inject = ['$stateParams', 'CooksService'];

  function getCook($stateParams, CooksService) {
    return CooksService.get({
      cookId: $stateParams.cookId
    }).$promise;
  }

  newCook.$inject = ['CooksService'];

  function newCook(CooksService) {
    return new CooksService();
  }
})();
