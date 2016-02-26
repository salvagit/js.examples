// declaro objeto vacio.
var obj = {};
// instancio
var z = obj;
// recorro y asigno obj.
for(var x=0; x<10; x++) obj[x] = x*10;
// declaro resta.
function resta (o) {
	// recorro y reasigno obj.
	for (var k in obj) obj[k] = obj[k] - 2;
}

console.log(z);
resta(obj);
console.log(z);
