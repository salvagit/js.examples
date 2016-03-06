/**
 * Crear directorios usando eventos
 */

// require EventEmitter.
var EventEmitter = require("events").EventEmitter;
// instancio EE.
var ee = new EventEmitter();
// require fs.
var fs = require("fs");

// declaro next.
var next = function(dirs, cur) {
	// incremento cursor.
	cur++;
	// disparo evento "create"
	ee.emit("create", dirs, cur);
};
// declaro evento "create"
ee.on("create", function(dirs, cur) {
	// loggeo cursor.
	console.log(">",cur, dirs[cur]);
	// si no tengo dir ..
	if(!dirs[cur]) return;
	// arrow function ..
	fs.exists(dirs[cur], (e) => {
		// si existe dir ..
		if(e) {
			console.log("ya existe");
			// siguiente dir ..
			next(dirs, cur);
		} else { // si no existe dir ..
			fs.mkdir(dirs[cur],(err) => {
				// siguiente dir ..
				next(dirs, cur);
			});
		}
	});
});
// decalro function "createDir"
function createDir() {
	// disparo evento "create"
	ee.emit("create",arguments, 0);
};
// llamo a Create dir.
createDir("pruebas", "pruebas/z", "pruebas/m", "testing");
