
/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  _ = require('underscore');

/**
 * Models
 */

var {{Replace}} = mongoose.model('{{Replace}}');
/**
 * Index
 * GET /{{replace}}s
 * GET /{{replace}}s/json
 */

exports.index = function (req, res) {
  {{Replace}}.find().exec(function(err, {{replace}}s) {
    if (req.url.indexOf('/json') > -1) return res.send({{replace}}s); // json
    return res.render('{{replace}}s', {{{replace}}s:{{replace}}s}); // html
  });
};

/**
 * Show
 * GET /{{replace}}s/:slug
 * GET /{{replace}}s/:slug/json
 */

exports.show = function (req, res, next) {
  {{Replace}}.findOne({ 'slug': req.params.slug }, function (err, {{replace}}) {
    if (err) return handleError(err);
    if (req.url.indexOf('/json') > -1) return res.send({{replace}}); // json
    return res.render('{{replace}}s/show', {{{replace}}:{{replace}}}); // html
  });
};


/**
 * New
 * GET /{{replace}}s/new
 */

exports.new = function (req, res, next) {
  var {{replace}} = new {{Replace}}();
  res.locals._{{replace}} = {{replace}};
  return res.render('{{replace}}s/new');
};

/**
 * Edit
 * GET /{{replace}}s/:slug/edit
 */

exports.edit = function (req, res, next) {
  {{Replace}}.findOne({ 'slug': req.params.slug }, function (err, {{replace}}) {
    if (!{{replace}}) return next();
    res.locals._{{replace}} = {{replace}};
    return res.render('{{replace}}s/edit'); // html
  });
};


/**
 * Create
 * POST /{{replace}}s/new
 */

exports.create = function (req, res, next) {
  var {{replace}} = new {{Replace}}(req.body);
  {{replace}}.save(function(err) {
    if( !err ) {
      return res.redirect('/{{replace}}s');
    } else {
      console.log( 'error' );
      console.log( err );
    }
  });
};



/**
 * Update
 * POST /{{replace}}s/:slug/edit
 */

exports.update = function (req, res, next) {
  {{Replace}}.findOne({ 'slug': req.params.slug }, function (err, {{replace}}) {
    {{replace}} = req.body;
    {{replace}}.save( function( err ) {
      if( !err ) {
        return res.redirect('/{{replace}}s');
      } else {
        console.log( err );
      }
    }); 
  });
};


/**
 * Delete
 * POST /{{replace}}s/:id/edit
 */


exports.delete = function (req, res, next) {
    return {{Replace}}.findById( req.params.id, function( err, {{replace}} ) {
        return {{replace}}.remove( function( err ) {
            if( !err ) {
                console.log( '{{Replace}} Removed!' );
                return res.redirect('/{{replace}}s');
            } else {
                console.log( err );
            }
        });
    });
};

