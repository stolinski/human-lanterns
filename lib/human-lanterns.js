//  ██░ ██  █    ██  ███▄ ▄███▓ ▄▄▄       ███▄    █     ██▓    ▄▄▄       ███▄    █ ▄▄▄█████▓▓█████  ██▀███   ███▄    █   ██████ 
// ▓██░ ██▒ ██  ▓██▒▓██▒▀█▀ ██▒▒████▄     ██ ▀█   █    ▓██▒   ▒████▄     ██ ▀█   █ ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒ ██ ▀█   █ ▒██    ▒ 
// ▒██▀▀██░▓██  ▒██░▓██    ▓██░▒██  ▀█▄  ▓██  ▀█ ██▒   ▒██░   ▒██  ▀█▄  ▓██  ▀█ ██▒▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒▓██  ▀█ ██▒░ ▓██▄   
// ░▓█ ░██ ▓▓█  ░██░▒██    ▒██ ░██▄▄▄▄██ ▓██▒  ▐▌██▒   ▒██░   ░██▄▄▄▄██ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  ▓██▒  ▐▌██▒  ▒   ██▒
// ░▓█▒░██▓▒▒█████▓ ▒██▒   ░██▒ ▓█   ▓██▒▒██░   ▓██░   ░██████▒▓█   ▓██▒▒██░   ▓██░  ▒██▒ ░ ░▒████▒░██▓ ▒██▒▒██░   ▓██░▒██████▒▒
//  ▒ ░░▒░▒░▒▓▒ ▒ ▒ ░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒░   ▒ ▒    ░ ▒░▓  ░▒▒   ▓▒█░░ ▒░   ▒ ▒   ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░
//  ▒ ░▒░ ░░░▒░ ░ ░ ░  ░      ░  ▒   ▒▒ ░░ ░░   ░ ▒░   ░ ░ ▒  ░ ▒   ▒▒ ░░ ░░   ░ ▒░    ░     ░ ░  ░  ░▒ ░ ▒░░ ░░   ░ ▒░░ ░▒  ░ ░
//  ░  ░░ ░ ░░░ ░ ░ ░      ░     ░   ▒      ░   ░ ░      ░ ░    ░   ▒      ░   ░ ░   ░         ░     ░░   ░    ░   ░ ░ ░  ░  ░  
//  ░  ░  ░   ░            ░         ░  ░         ░        ░  ░     ░  ░         ░             ░  ░   ░              ░       ░  
                                                                                                                             

// 
// Setup
// *****

// Requires
var fs = require('fs');
var path = require('path');
var lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');
// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("What do you think of node.js? ", function(answer) {
//   // TODO: Log the answer in a database
//   console.log("Thank you for your valuable feedback:", answer);

//   rl.close();
// });


function genThis() {

    if (!process.argv[2]) {
        outputHelp();
        return;
    }

    // Grabs command arguments and pulling out commands
    var args = process.argv[2].toString();
    args = args.split(':');
    
    mkpath('app', function (err) {
        if (err) throw err;
        // Kicks things off. Sends commands to router
        filter(args);
    });
}

function outputHelp() {
    console.log("Please pass a valid command.");
    console.log("gen:modelname              - Generates complete resouces with the name of 'modelname'.");
    console.log("model:modelname            - Generates a model with the name of 'modelname'.");
    console.log("controllers:modelname      - Generates controllers with the name of 'modelname(s)'.");
    console.log("routes:modelname           - Generates routes with the name of 'modelname(s)'.");
    console.log("views:modelname            - Generates basic CRUD views.");
}


// 
// Routing
// *******

// Determines routing for the proper action
function filter(command) {
	switch (command[0]) {
        // 'gen' command generates all files
		case 'gen':
    		console.log("Creating Files...");
    		createModel(command[1]);
            createController(command[1]);
            createViews(command[1]);
            createRoutes(command[1]);
    		break;
        // 'model' command generates just model files
        case 'model':
            console.log("Creating Model...");
            createModel(command[1]);
            break;
        // 'controller' command generates the controller file with CRUD
        case 'controllers':
            console.log("Creating Controllers...");
            createController(command[1]);
            break;
        // 'routes' command generates the routes file with CRUD
        case 'routes':
            console.log("Creating Routes...");
            createRoutes(command[1]);
            break;
        // 'views' command generates the routes file with CRUD
        case 'views':
            console.log("Creating Views...");
            createViews(command[1]);
            break;
        // Non-allowed commands end the script
    	default:
            outputHelp();
    		break;
    }
}



// 
// Model Creator
// ******************

// Pulls and creates model
function createModel(model) {
	mkpath('app/models', function (err) {
   		if (err) throw err;
    	console.log('Created or confirmed - app/models/');

    	// Pulls model from seed-model.js
    	var body = generateModel(model);

        // Creates modelname.js file
        fs.writeFile("app/models/" + model + ".js", body , function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Created - app/models/" + model + ".js");
            }
        });     		
	});
    return;
}

// Pulls model from seed-model.js
function generateModel(model) {
    var seed = fs.readFileSync(lib+'/seeds/model-seed.js', 'utf8');
    seed = seed.replace(/{{replace}}/g, model);
    return seed.replace(/{{Replace}}/g, capitaliseFirstLetter(model));
}



// 
// Controller Creator
// ******************

// Pulls and creates controller
function createController(controller) {
    mkpath('app/controllers', function (err) {
        if (err) throw err;
        console.log('Created or confirmed - app/controllers/');

        // Pulls controller from seed-controller.js
        var body = generateController(controller);

        // Creates controllername(s).js file
        fs.writeFile("app/controllers/" + controller + "s.js", body , function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Created - app/controllers/" + controller + "s.js");
            }
        });             
    });
}

// Pulls controller from seed-controller.js
function generateController(controller) {
    var seed = fs.readFileSync(lib+'/seeds/controller-seed.js', 'utf8');
    seed = seed.replace(/{{replace}}/g, controller);
    return seed.replace(/{{Replace}}/g, capitaliseFirstLetter(controller));
}



// 
// Routes Creator
// ******************

// Pulls and creates routes
function createRoutes(route) {
    mkpath('app/routes', function (err) {
        if (err) throw err;
        console.log('Created or confirmed - app/routes/');

        // Pulls route from seed-route.js
        var body = generateRoutes(route);

        // Creates routename(s).js file
        fs.writeFile("app/routes/" + route + "s.js", body , function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Created - app/routes/" + route + "s.js");
                console.log("******** Notice ********\nYou MUST consolidate routes into main routes file, they will not work as is.\n******** Notice ********");
            }
        });             
    });
}

// Pulls route from seed-routes.js
function generateRoutes(route) {
    var seed = fs.readFileSync(lib+'/seeds/routes-seed.js', 'utf8');
    seed = seed.replace(/{{replace}}/g, route);
    return seed.replace(/{{Replace}}/g, capitaliseFirstLetter(route));
}



// 
// Views Creator
// ******************

// Pulls and creates routes
function createViews(view) {
    mkpath('app/views/' + view + 's', function (err) {
        if (err) throw err;
        console.log('Created or confirmed - app/views/');

        // Pulls view from seed-view.js
        generateViews(view);          
    });
}

// Pulls view from seed-views.js
function generateViews(view) {
    var seeds = ['index.ejs', 'partial.ejs', 'form.ejs', 'new.ejs', 'edit.ejs'];

    seeds.forEach(function(seed) {

        var body = pullViews(view, seed);

        if (seed == 'partial.ejs') {
            seed = view + '.ejs';
        }

        var path = "app/views/" + view + 's/' + seed;


        fs.writeFile(path, body , function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Created - " + path);
            }
        });
    });
    return;
}

// Pulls seed files 
function pullViews(view, seedFile) {
    var seed = fs.readFileSync(lib+"/seeds/" + seedFile, 'utf8');
    seed = seed.replace(/{{replace}}/g, view);
    return seed.replace(/{{Replace}}/g, capitaliseFirstLetter(view));
}



// 
// Utilities 
// *********

// Capitalizes First Letter
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Mkpath function taken from https://github.com/jrajav/mkpath
function mkpath(dirpath, mode, callback) {
    dirpath = path.resolve(dirpath);

    if (typeof mode === 'function' || typeof mode === 'undefined') {
        callback = mode;
        mode = 0777 & (~process.umask());
    }

    if (!callback) {
        callback = function () {};
    }

    fs.stat(dirpath, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                mkpath(path.dirname(dirpath), mode, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        fs.mkdir(dirpath, mode, callback);
                    }
                });
            } else {
                callback(err);
            }
        } else if (stats.isDirectory()) {
            callback(null);
        } else {
            callback(new Error(dirpath + ' exists and is not a directory'));
        }
    });
}

mkpath.sync = function mkpathsync(dirpath, mode) {
    dirpath = path.resolve(dirpath);

    if (typeof mode === 'undefined') {
        mode = 0777 & (~process.umask());
    }

    try {
        if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(dirpath + ' exists and is not a directory');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            mkpathsync(path.dirname(dirpath), mode);
            fs.mkdirSync(dirpath, mode);
        } else {
            throw err;
        }
    }
};

exports.gen = genThis;



        // fs.exists(path, function(exists) {
        //     if (path) {
        //         rl.question(path + " already exists, overwrite? (Y,N)", function(answer) {
        //             if ( answer == "Y" || answer == "y" ) {
        //                 console.log("yessss");
        //                 // Creates viewname(s).js file
        //                 fs.writeFile(path, body , function(err) {
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         console.log("Created - " + path);
        //                     }
        //                 }); 
        //             } else {
        //                 console.log("noooooo");
        //             }
        //             rl.close();
        //         });
        // }       