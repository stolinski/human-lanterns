var fs = require('fs');
var path = require('path');


// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var args = process.argv;

args.shift();
args.shift();

args = args.toString();
args = args.split(':');

filter(args);



// Generates model file
function generateModel(model) {
	var seed = fs.readFileSync('seeds/model-seed.js', 'utf8');
	// console.log(seed.replace(/{{replace}}/g, model));
	return seed.replace(/{{replace}}/g, model);
}



// Determines routing for the proper action
function filter(args) {
	switch (args[0]) {
		case 'gen':
    		console.log("Creating Files")
    		createModel(args[1]);
    		break;
    	default:
    		console.log("Incorrect Command")
    		break;
    }
}


function createModel(model) {
	mkpath('app/models', function (err) {
   		if (err) throw err;
    	console.log('+app/models');
    	// Creates model file
    	var body = generateModel(model);
    		console.log(body);

			fs.writeFile("app/models/" + model + ".js", body , function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("The file was saved!");
			    }
			});     		
	});
}






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