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
  address: {
    type: String,
    default: '',
    required: 'Please provide your address',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    required: 'Please provide your phone number',
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number! example: 571-123-4567'
    }
  },
  foodLimit: {
    type: Number,
    default: '',
    required: 'What is the maximum number of orders you can service at one time?',
    min: 1,
    trim: true
  },
  specialties: {
    type: String,
    default: '',
    required: 'Do you have any specialities?',
    trim: true
  },
  cookingPic: {
    type: String,
    default: 'modules/users/client/img/profile/default.png',
    required: 'Please Upload a picture of your kitchen or you cooking'
  },
  profile: {
    type: String,
    default: '',
    required: 'Please provide overview of your cooking style or restrictions',
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
