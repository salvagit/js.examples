/**
 * Crear directorios usando recur
 */

// require fs
var fs = require("fs");

function createDir(){

	var dirs = [];

	// object 2 array
	for(var k in arguments) dirs.push(arguments[k]);

	var _ =function(){
		var dirname = dirs.shift();
		console.log(">>>>",dirname);
		if(!dirname) return;
			fs.mkdir(dirname, (err)=> {
				console.log(err);
				_();
			});
	};
	_();

};

createDir("pruebas", "pruebas/z", "pruebas/m", "testing");
