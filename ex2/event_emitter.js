// require EventEmitter.
var EventEmitter = require("events").EventEmitter;
// instancio EE.
var ee = new EventEmitter;
// declaro evento "cursando"
ee.on('cursando', function(a,b,c) {
	setTimeout(function(){
    // disparo evento "msg"
		ee.emit('msg','cursando'.concat(a,b,c));
	}, 1000);
});
// declaro evento "msg"
ee.on('msg', function(msg) {
	console.log(msg);
});
// itero.
for (var i = 0; i < 10; i++) {
  // disparo evento "cursando"
	ee.emit('cursando', i,i*2,i*5);
};
// disparo evento "msg"
ee.emit("msg","end");
