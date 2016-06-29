(function () {
  'use strict';

  angular
    .module('cooks')
    .controller('CooksListController', CooksListController);

  CooksListController.$inject = ['CooksService'];

  function CooksListController(CooksService) {
    var vm = this;

    vm.cooks = CooksService.query();
  }
})();
