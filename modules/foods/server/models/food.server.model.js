'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Food Schema
 */
var FoodSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill food name',
    trim: true
  },
  desc: {
    type: String,
    default: '',
    required: 'Please add a description for the food item',
    trim: true
  },
  quantity: {
    type: String,
    default: '',
    required: 'Please describe the quantity of the dish',
    trim: true
  },
  price: {
    type: Number,
    default: '0.0',
    required: 'Enter price',
    trim: true
  },
  cook: {
    type: Schema.ObjectId,
    ref: 'Cooks'
  },
  reviews : [
    {
      type: Schema.ObjectId,
      ref: 'reviews'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Food', FoodSchema);
