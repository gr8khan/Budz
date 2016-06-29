//Cooks service used to communicate Cooks REST endpoints
(function () {
  'use strict';

  angular
    .module('cooks')
    .factory('CooksService', CooksService);

  CooksService.$inject = ['$resource'];

  function CooksService($resource) {
    return $resource('api/cooks/:cookId', {
      cookId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
