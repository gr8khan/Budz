'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cook = mongoose.model('Cook'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cook
 */
exports.create = function(req, res) {
  var cook = new Cook(req.body);
  cook.user = req.user;

  cook.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
        User.update({_id:req.user._id},{cook:cook._id});
        res.jsonp(cook);
    }
  });
};

/**
 * Show the current Cook
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cook = req.cook ? req.cook.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cook.isCurrentUserOwner = req.user && cook.user && cook.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(cook);
};

/**
 * Update a Cook
 */
exports.update = function(req, res) {
  var cook = req.cook ;

  cook = _.extend(cook , req.body);

  cook.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cook);
    }
  });
};

/**
 * Delete an Cook
 */
exports.delete = function(req, res) {
  var cook = req.cook ;

  cook.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cook);
    }
  });
};

/**
 * List of Cooks
 */
exports.list = function(req, res) { 
  Cook.find().sort('-created').populate('user', 'displayName').exec(function(err, cooks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cooks);
    }
  });
};

/**
 * Cook middleware
 */
exports.cookByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cook is invalid'
    });
  }

  Cook.findById(id).populate('user', 'displayName').exec(function (err, cook) {
    if (err) {
      return next(err);
    } else if (!cook) {
      return res.status(404).send({
        message: 'No Cook with that identifier has been found'
      });
    }
    req.cook = cook;
    next();
  });
};
