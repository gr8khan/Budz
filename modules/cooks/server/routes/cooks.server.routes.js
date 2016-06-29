'use strict';

/**
 * Module dependencies
 */
var cooksPolicy = require('../policies/cooks.server.policy'),
  cooks = require('../controllers/cooks.server.controller');

module.exports = function(app) {
  // Cooks Routes
  app.route('/api/cooks').all(cooksPolicy.isAllowed)
    .get(cooks.list)
    .post(cooks.create);

  app.route('/api/cooks/:cookId').all(cooksPolicy.isAllowed)
    .get(cooks.read)
    .put(cooks.update)
    .delete(cooks.delete);

  // Finish by binding the Cook middleware
  app.param('cookId', cooks.cookByID);
};
