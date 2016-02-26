// declaro storage.
function storage () {
	console.log(this, arguments);
}
// intancio
// al instaciar sin asignar por default
// devuelve un casteo toString del objeto.
new storage(1,"str",NaN,undefined);
/**
 * Overradeo/Piso el contexto.
 */
// con call
storage.call({a:2},"str",NaN,undefined);
// con apply
storage.apply({a:2},["str",undefined]);

/**
* otro ejemplo.
*/

var o = function () {}; // undefined
Object.prototype.toString.call(o); // "[object Function]"

/**
 * otro
 */

function hola (s) {
  this.a = 1;
  console.log(s,1);
}

hola.call(o) // VM607:4 undefined 1

 /**
 * otro
 */

var a = "declared variable";

var fc = function () {
  console.log(a);
};
(function () {
  a = "hello world";
  fc();
}) ();
