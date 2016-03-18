var express = require('express');
var mongojs = require('mongojs');
var Students = require("./lib/Students");

//var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var db = mongojs("class4",["students", "materias", "notas"]);
var students = new Students(db);

//app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'default'}));
//app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static("public"));
app.use(function(req, res, next){
	console.log("Alguien llego ", req.headers['user-agent']);
	next();
});

app.post("/save", function(req, res){

	students.save({name: req.body.name || "noname",
					dni: parseInt(req.body.dni || "0000000"),
					city: req.body.city || "noCity"})
		.then(function(){
			res.end("alumno saved");
		}, function(){
			res.end("termino mal");
		});
});


app.get("/", function(req, res){
	students.get()
		.then(function(docs){
			res.json(docs);
		}, function(){
			res.end("Error");
		});
});

app.get("/hi/:name", function(req, res){
	console.log(req.params);
	res.send("hi " + req.params.name);
})
app.listen(3000);
