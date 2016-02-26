// declaro a().
function a (a,b,c) {
	this.a = 123;
	console.log(this);
}
// loggeo nueva instancia.
console.log(new a());
// instancio
var b = new a();
// declaro a.proto
a.prototype.hi = function (s) {
	return s || 'sin datos';
}
// ejecuto b.hi, decalarada luego de la instanciar b :P
console.log(b.hi('tito'));
