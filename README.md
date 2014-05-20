# Human Lanterns v0.0.4

Builds out basic RESTful scaffolding files for Express/Mongoose/EJS with the following file stucture.

## Usage

### Install

    npm install -g human-lanterns

### Running

    lanterns gen:modelname
    

    app
    	- views
    	|	- modelname(s)
    	|		- index.ejs
    	|		- modelname.ejs
    	|		- form.ejs
    	|       - edit.ejs
    	|       - new.ejs
    
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

This creates app/controllers folder(s) if they don't already exist and creates a names.js file inside with basic RESTful controllers.


#### Views Generator

    lanterns views:modelname

This creates app/views folder(s) if they don't already exist and creates an ejs template for the basic RESTful controllers. See above for files created specifically.



## Requirements

This is to be used with Express 4.

This uses [ejs-locals](https://github.com/RandomEtc/ejs-locals). Please install and add ejs-locals.

This uses a toSlug(); middleware function. Please add this to your middleware, or use this function in your pre-save hook

    toSlug = function (value) {
      return value.toLowerCase().replace(/[ |_]/g, '-').replace(/[^\w-]+/g,'');
    };


## Todos

* Clean up code
* Check for existing files and prompt for overwrite


## Acknowledgments

This package takes its name from my favorite movie, the Sun Chung classic Human Lanterns (1982) [Trailer](https://www.youtube.com/watch?v=cIKSIT_0JsU), [Cool Ass Cinema Review](http://www.coolasscinema.com/2010/03/human-lanterns-1982-review.html)  - Word of warning - This movie is gruesome and violent but is completely unique and has an excellent visual style and choreography.

### Sponsored By

[Level Up Tuts](http://leveluptuts.com/) - [Youtube Channel](https://www.youtube.com/user/LevelUpTuts/)