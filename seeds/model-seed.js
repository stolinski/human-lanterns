/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * {{replace}} Schema
 */

var {{replace}}Schema = new Schema({
  title: {type:String, required: true },
  body: String,
  // _refname: { type: ObjectId, ref: 'Name' },
  // date: Date,
});

mongoose.model('{{replace}}', {{replace}}Schema);