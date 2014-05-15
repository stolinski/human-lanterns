var tests = require('../app/controllers/tests'),   

  // tests
  app.get('/tests', tests.index);
  app.get('/tests/json', tests.index);
  app.get('/tests/new', tests.new);
  app.post('/tests/new', tests.create);
  app.get('/tests/:slug', tests.show);
  app.get('/tests/:slug/json', tests.show);
  app.get('/tests/:slug/edit', tests.edit);
  app.post('/tests/:slug/edit', tests.update);