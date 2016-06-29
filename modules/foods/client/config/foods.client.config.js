(function () {
  'use strict';

  angular
    .module('foods')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Foods',
      state: 'foods',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'foods', {
      title: 'List Foods',
      state: 'foods.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'foods', {
      title: 'Create Food',
      state: 'foods.create',
      roles: ['user']
    });
  }
})();
