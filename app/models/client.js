/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Client Schema
 */

var ClientSchema = new Schema({
  title: {type:String, required: true },
  body: String,
  // binary:  Buffer,
  // living:  Boolean,
  // updated: { type: Date, default: Date.now }
  // age:     { type: Number, min: 18, max: 65 }
  // mixed:   Schema.Types.Mixed,
  // array:      [],
  // _refname: { type: ObjectId, ref: 'Name' },
});

mongoose.model('Client', ClientSchema);