var arr = [];

function add (f) {
	arr.push(f);
}

function run () {
	arr.forEach(function (a) {
		a();
	});
}

add(function(){console.log('hola')})
add(function(){console.log('chau')})
run();
