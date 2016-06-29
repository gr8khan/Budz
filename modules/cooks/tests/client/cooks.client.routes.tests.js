(function () {
  'use strict';

  describe('Cooks Route Tests', function () {
    // Initialize global variables
    var $scope,
      CooksService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CooksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CooksService = _CooksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('cooks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/cooks');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CooksController,
          mockCook;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('cooks.view');
          $templateCache.put('modules/cooks/client/views/view-cook.client.view.html', '');

          // create mock Cook
          mockCook = new CooksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cook Name'
          });

          //Initialize Controller
          CooksController = $controller('CooksController as vm', {
            $scope: $scope,
            cookResolve: mockCook
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:cookId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.cookResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            cookId: 1
          })).toEqual('/cooks/1');
        }));

        it('should attach an Cook to the controller scope', function () {
          expect($scope.vm.cook._id).toBe(mockCook._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/cooks/client/views/view-cook.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CooksController,
          mockCook;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('cooks.create');
          $templateCache.put('modules/cooks/client/views/form-cook.client.view.html', '');

          // create mock Cook
          mockCook = new CooksService();

          //Initialize Controller
          CooksController = $controller('CooksController as vm', {
            $scope: $scope,
            cookResolve: mockCook
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.cookResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/cooks/create');
        }));

        it('should attach an Cook to the controller scope', function () {
          expect($scope.vm.cook._id).toBe(mockCook._id);
          expect($scope.vm.cook._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/cooks/client/views/form-cook.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CooksController,
          mockCook;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('cooks.edit');
          $templateCache.put('modules/cooks/client/views/form-cook.client.view.html', '');

          // create mock Cook
          mockCook = new CooksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cook Name'
          });

          //Initialize Controller
          CooksController = $controller('CooksController as vm', {
            $scope: $scope,
            cookResolve: mockCook
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:cookId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.cookResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            cookId: 1
          })).toEqual('/cooks/1/edit');
        }));

        it('should attach an Cook to the controller scope', function () {
          expect($scope.vm.cook._id).toBe(mockCook._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/cooks/client/views/form-cook.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
