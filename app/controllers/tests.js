
/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  _ = require('underscore');

/**
 * Models
 */

var Test = mongoose.model('Test');
/**
 * Index
 * GET /tests
 * GET /tests/json
 */

exports.index = function (req, res) {
  Test.find().exec(function(err, tests) {
    if (req.url.indexOf('/json') > -1) return res.send(tests); // json
    return res.render('tests', {tests:tests}); // html
  });
};

/**
 * Show
 * GET /tests/:slug
 * GET /tests/:slug/json
 */

exports.show = function (req, res, next) {
  Test.findOne({ 'slug': req.params.slug }, function (err, test) {
    if (err) return handleError(err);
    if (req.url.indexOf('/json') > -1) return res.send(test); // json
    return res.render('tests/show', {test:test}); // html
  });
};


/**
 * New
 * GET /tests/new
 */

exports.new = function (req, res, next) {
  var test = new Test();
  res.locals._test = test;
  return res.render('tests/new');
};

/**
 * Edit
 * GET /tests/:slug/edit
 */

exports.edit = function (req, res, next) {
  Test.findOne({ 'slug': req.params.slug }, function (err, test) {
    if (!test) return next();
    res.locals._test = test;
    return res.render('tests/edit'); // html
  });
};


/**
 * Create
 * POST /tests/new
 */

exports.create = function (req, res, next) {
  var test = new Test(req.body);
  test.save(function(err) {
    if( !err ) {
      return res.redirect('/tests');
    } else {
      console.log( 'error' );
      console.log( err );
    }
  });
};



/**
 * Update
 * POST /tests/:slug/edit
 */

exports.update = function (req, res, next) {
  Test.findOne({ 'slug': req.params.slug }, function (err, test) {
    test = req.body;
    test.save( function( err ) {
      if( !err ) {
        return res.redirect('/tests');
      } else {
        console.log( err );
      }
    }); 
  });
};


/**
 * Delete
 * POST /tests/:id/edit
 */


exports.delete = function (req, res, next) {
    return Test.findById( req.params.id, function( err, test ) {
        return test.remove( function( err ) {
            if( !err ) {
                console.log( 'Test Removed!' );
                return res.redirect('/tests');
            } else {
                console.log( err );
            }
        });
    });
};

