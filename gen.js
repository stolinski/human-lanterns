                                                                                                                                                                                                               
//  __   __     ______     _____     ______        ______     ______     __   __     ______     ______     ______     ______   ______     ______    
// /\ "-.\ \   /\  __ \   /\  __-.  /\  ___\      /\  ___\   /\  ___\   /\ "-.\ \   /\  ___\   /\  == \   /\  __ \   /\__  _\ /\  __ \   /\  == \   
// \ \ \-.  \  \ \ \/\ \  \ \ \/\ \ \ \  __\      \ \ \__ \  \ \  __\   \ \ \-.  \  \ \  __\   \ \  __<   \ \  __ \  \/_/\ \/ \ \ \/\ \  \ \  __<   
//  \ \_\\"\_\  \ \_____\  \ \____-  \ \_____\     \ \_____\  \ \_____\  \ \_\\"\_\  \ \_____\  \ \_\ \_\  \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\ 
//   \/_/ \/_/   \/_____/   \/____/   \/_____/      \/_____/   \/_____/   \/_/ \/_/   \/_____/   \/_/ /_/   \/_/\/_/     \/_/   \/_____/   \/_/ /_/ 
                        


// Requires
var fs = require('fs');
var path = require('path');

// Grabs command arguments and pulling out commands
var args = process.argv[2].toString();
args = args.split(':');


// Kicks things off. Sends commands to router
filter(args);



// Determines routing for the proper action
function filter(command) {
	switch (command[0]) {
        // 'gen' command generates all files
		case 'gen':
    		console.log("Creating Files...");
    		createModel(command[1]);
    		break;
        // 'model' command generates just model files
        case 'model':
            console.log("Creating Model...");
            createModel(command[1]);
            break;
        // Non-allowed commands end the script
    	default:
    		console.log("Incorrect Command");
    		break;
    }
}


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
}

// Pulls model from seed-model.js
function generateModel(model) {
    var seed = fs.readFileSync('seeds/model-seed.js', 'utf8');
    // console.log(seed.replace(/{{replace}}/g, model));
    return seed.replace(/{{replace}}/g, model);
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
};

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