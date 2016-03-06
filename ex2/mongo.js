// simple usage for a local db

// require mongojs
var mongojs = require('mongojs');
// creo colecion
var db = mongojs('curso', ['class2']);
// select * from class2 ..
db.class2.find((err, docs)=>{
	console.log(err, docs);
});
// itero ..
for(var x=0; x<1000; x++) {
	// creo obj ..
	var obj = {
		added: new Date(),
		num: x,
		ele: x*100
	};
	// espero ..
	setTimeout(function(){
			// guardo.
			db.class2.save(obj, (err, docs)=>{
				// console.log(err, docs);
			});
	},Math.floor(Math.random()*100));
}//end for
