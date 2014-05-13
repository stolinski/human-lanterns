# Node Express Generator

## An extreme WIP

More info soon!

### Generators

#### Main Generator

To generate a boilerplate model run:

    node gen.js gen:name

This runs all 3 generators; model, controller, and views.

#### Model Generator

    node gen.js model:modelname

This creates app/models folder(s) if they don't already exist and creates a modelname.js file inside with barebone required title and body text field and commented out Mongoose schema types.

#### Controller Generator

    node gen.js controller:name

This creates app/controllers folder(s) if they don't already exist and creates a names.js file inside with basic CRUD controllers.


Very soon 'gen:' will generate the boilerplate for views (using ejs), controllers, and models and other commands like 'model:' will be used to just generate the model.