# Human Lanterns v0.0.3

## An extreme WIP

Builds out basic CRUD files scaffolding for Express/Mongoose/EJS with the following file stucture.

    app
    	- views
    	|	- modelname(s)
    	|		- index.ejs
    	|		- modelname.ejs
    	|		- form.ejs
    
    	- routes
    	|	- modelname(s).js (to be copied and deleted)
    
    	- controllers 
    	|	- modelname(s).js
    
    	- models
    	|	- modelname.js

If folders don't exist, they will be created, if they already exist, the files will be added to the existing folders.


### Generators

Human Lanterns includes 5 generators. The main generator that creates all resoureces listed above and then a separate generator for views, routes, controllers, and models. Proper pluralization will be added to the modelname, so please use singular form when generating to avoided things like "clientss".

#### Main Generator

To generate a boilerplate model run:

    lanterns gen:modelname

This runs all 4 generators; model, controller, routes, and views.

#### Model Generator

	lanterns model:modelname

This creates app/models folder(s) if they don't already exist and creates a modelname.js file inside with barebone required title and body text field and commented out Mongoose schema types.

#### Controller Generator

    lanterns controllers:modelname

This creates app/controllers folder(s) if they don't already exist and creates a names.js file inside with basic CRUD controllers.


#### Views Generator

    lanterns views:modelname

This creates app/views folder(s) if they don't already exist and creates an ejs template for the basic CRUD controllers. See above for files created specifically.



## Requirements

This is to be used with Express 4.

This uses a toSlug(); middleware function. Please add this to your middleware, or use this function in your pre-save hook

    toSlug = function (value) {
      return value.toLowerCase().replace(/[ |_]/g, '-').replace(/[^\w-]+/g,'');
    };


## Todos


* Finish views generator. Currently missing the new.ejs and edit.ejs seeds
* Clean up code
* Check for existing files and prompt for overwrite
* Create help command
* Create usage doc when no args are passed