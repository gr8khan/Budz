'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var cooks = [
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 1',
        image:'http://placehold.it/300x200?text=food1'},
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 2',
        image:'http://placehold.it/300x200?text=food2' },
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 3',
        image:'http://placehold.it/300x200?text=food3' },
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 4',
        image:'http://placehold.it/300x200?text=food4' },
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 5',
        image:'http://placehold.it/300x200?text=food5' },
      { profilePhoto: 'http://placehold.it/50x50',
        name: 'Cook 6',
        image:'http://placehold.it/300x200?text=food6' }
    ];

    //var cuisines = [
    //  { name: 'Cuisine 1',
    //    image:'http://placehold.it/150x150?text=Cuisine1'},
    //  { name: 'Cuisine 1',
    //    image:'http://placehold.it/150x150?text=Cuisine2'}
    //];

    //$scope.cuisines = cuisines;
    $scope.cooks = cooks;

  }
]);
