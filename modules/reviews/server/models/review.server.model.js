'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  comment: {
    type: String,
    default: '',
    required: 'Please add comments',
    trim: true
  },
  stars: {
    type: Number,
    min: 1,
    max:5,
    default: '',
    required: 'Please add stars',
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

mongoose.model('Review', ReviewSchema);
