/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Test Schema
 */

var TestSchema = new Schema({
  title: {type:String, required: true },
  slug: String,
  // body: String,
  // binary:  Buffer,
  // living:  Boolean,
  // updated: { type: Date, default: Date.now }
  // age:     { type: Number, min: 18, max: 65 }
  // mixed:   Schema.Types.Mixed,
  // array:      [],
  // _refname: { type: ObjectId, ref: 'Name' },
});



/**
 * Pre-validation hook; Sanitizers
 */

TestSchema.pre('validate', function(next) {
  next();
});


/**
 * Pre-save hook
 */

TestSchema.pre('save', function(next) {
  this.slug = toSlug(this.title);
  next();
});


mongoose.model('Test', TestSchema);