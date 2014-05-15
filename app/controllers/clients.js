
/**
 * Module dependencies
 */

var mongoose = require('mongoose'), 
  _ = require('underscore');

/**
 * Models
 */

var Client = mongoose.model('Client');
/**
 * Index
 * GET /clients
 * GET /clients/json
 */

exports.index = function (req, res) {
  Client.find().exec(function(err, clients) {
    if (req.url.indexOf('/json') > -1) return res.send(clients); // json
    return res.render('clients', {clients:clients}); // html
  });
};

/**
 * Show
 * GET /clients/:slug
 * GET /clients/:slug/json
 */

exports.show = function (req, res, next) {
  Client.findOne({ 'slug': req.params.slug }, function (err, client) {
    if (err) return handleError(err);
    if (req.url.indexOf('/json') > -1) return res.send(client); // json
    return res.render('clients/show', {client:client}); // html
  });
};


/**
 * New
 * GET /clients/new
 */

exports.new = function (req, res, next) {
  var client = new Client();
  res.locals._client = client;
  return res.render('clients/new');
};

/**
 * Edit
 * GET /clients/:slug/edit
 */

exports.edit = function (req, res, next) {
  Client.findOne({ 'slug': req.params.slug }, function (err, client) {
    if (!client) return next();
    res.locals._client = client;
    return res.render('clients/edit'); // html
  });
};


/**
 * Create
 * POST /clients/new
 */

exports.create = function (req, res, next) {
  var client = new Client(req.body);
  client.save(function(err) {
    if( !err ) {
      return res.redirect('/clients');
    } else {
      console.log( 'error' );
      console.log( err );
    }
  });
};



/**
 * Update
 * POST /clients/:slug/edit
 */

exports.update = function (req, res, next) {
  Client.findOne({ 'slug': req.params.slug }, function (err, client) {
    client = req.body;
    client.save( function( err ) {
      if( !err ) {
        return res.redirect('/clients');
      } else {
        console.log( err );
      }
    }); 
  });
};


/**
 * Delete
 * POST /clients/:id/edit
 */


exports.delete = function (req, res, next) {
    return Client.findById( req.params.id, function( err, client ) {
        return client.remove( function( err ) {
            if( !err ) {
                console.log( 'Client Removed!' );
                return res.redirect('/clients');
            } else {
                console.log( err );
            }
        });
    });
};

