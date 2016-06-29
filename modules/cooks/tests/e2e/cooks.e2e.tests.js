'use strict';

describe('Cooks E2E Tests:', function () {
  describe('Test Cooks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/cooks');
      expect(element.all(by.repeater('cook in cooks')).count()).toEqual(0);
    });
  });
});
