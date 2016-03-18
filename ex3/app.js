// simple usage for a local db
var mongojs = require('mongojs');
var db = mongojs('curso', ['notas', "promedios"]);
//var http = require("http");


function promedios(){
	var promedios ={};
	var aux=0;

	return new Promise(function(resolve, reject){
	
			db.notas.find((err, docs)=>{
				console.log("Total notas: ", docs.length);				
				
				for(var x=0; x<docs.length; x++){
					var key = docs[x].alumno+docs[x].materia;
					if(typeof promedios[key]=="undefined"){
						promedios[key]={count:1, 
										sum: docs[x].nota, 
										alumno: docs[x].alumno, 
										materia: docs[x].materia
										};			
					}else{
						promedios[key].count++;
						promedios[key].sum = promedios[key].sum+docs[x].nota;
					}
				}//end for
				
				db.promedios.remove({}, {multi:1}, function(){
					for(var k in promedios){
						promedios[k].promedio = promedios[k].sum / promedios[k].count;
						delete promedios[k].sum;
						delete promedios[k].count;
						db.promedios.save(promedios[k]);
					}					
					resolve();
				});
				
			});
	
	});
};


function getPromedios(){

	return new Promise(function(resolve, reject){
		db.promedios.find({},{}, function(err, docs){
			if(err) reject();
			else resolve(docs);			
		});
	});
};


promedios()
	.then(function(){
		return getPromedios()
	}, function(err){
		console.log("algo se rompio: ", err);
	})
	.then(function(promedios){
		console.log(promedios);
	}, function(err){
		console.log("algo se rompio obteniendo promedios: ", err);
	});

