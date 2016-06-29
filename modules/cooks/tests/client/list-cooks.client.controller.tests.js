(function () {
  'use strict';

  describe('Cooks List Controller Tests', function () {
    // Initialize global variables
    var CooksListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      CooksService,
      mockCook;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _CooksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      CooksService = _CooksService_;

      // create mock article
      mockCook = new CooksService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Cook Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Cooks List controller.
      CooksListController = $controller('CooksListController as vm', {
        $scope: $scope
      });

      //Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockCookList;

      beforeEach(function () {
        mockCookList = [mockCook, mockCook];
      });

      it('should send a GET request and return all Cooks', inject(function (CooksService) {
        // Set POST response
        $httpBackend.expectGET('api/cooks').respond(mockCookList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.cooks.length).toEqual(2);
        expect($scope.vm.cooks[0]).toEqual(mockCook);
        expect($scope.vm.cooks[1]).toEqual(mockCook);

      }));
    });
  });
})();
