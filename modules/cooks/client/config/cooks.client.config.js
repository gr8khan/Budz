(function () {
  'use strict';

  angular
    .module('cooks')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Cooks',
      state: 'cooks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'cooks', {
      title: 'List Cooks',
      state: 'cooks.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'cooks', {
      title: 'Create Cook',
      state: 'cooks.create',
      roles: ['user']
    });
  }
})();
