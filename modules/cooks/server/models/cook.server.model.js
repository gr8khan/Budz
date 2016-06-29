'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cook Schema
 */
var CookSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Cook name',
    trim: true
  },
  story: {
    type: String,
    default: '',
    required: 'Please fill Cooks background story',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Cook', CookSchema);
