(function () {
  'use strict';

  // Cooks controller
  angular
    .module('cooks')
    .controller('CooksController', CooksController);

  CooksController.$inject = ['$scope', '$state', 'Authentication', 'cookResolve'];

  function CooksController ($scope, $state, Authentication, cook) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cook = cook;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Cook
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.cook.$remove($state.go('cooks.list'));
      }
    }

    // Save Cook
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cookForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.cook._id) {
        vm.cook.$update(successCallback, errorCallback);
      } else {
        vm.cook.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cooks.view', {
          cookId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
