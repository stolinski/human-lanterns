var {{replace}}s = require('../app/controllers/{{replace}}s'),   

  // {{replace}}s
  app.get('/{{replace}}s', {{replace}}s.index);
  app.get('/{{replace}}s/json', {{replace}}s.index);
  app.get('/{{replace}}s/new', {{replace}}s.new);
  app.post('/{{replace}}s/new', {{replace}}s.create);
  app.get('/{{replace}}s/:slug', {{replace}}s.show);
  app.get('/{{replace}}s/:slug/json', {{replace}}s.show);
  app.get('/{{replace}}s/:slug/edit', {{replace}}s.edit);
  app.post('/{{replace}}s/:slug/edit', {{replace}}s.update);