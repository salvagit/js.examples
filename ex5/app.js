// webstorm

var express = require('express');
var mongojs = require('mongojs');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var Students = require("./lib/Students");

var db = mongojs("class4", ["students", "materias", "notas"]);
var students = new Students(db);

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'default'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("home", {
		hoy: new Date(),
		alumnos: [{name:"Pepe", age:23}, {name:"Luis", age:55}, {name:"Carlos", age:43}]
	});
});

app.get("/students", function (req, res){
	students.get()
	.then (function (docs){
		// res.json(docs);
		res.render("student", {'students':docs});

	} , function (e) {
		res.end("mal!");
		console.log(e);
	});
});

app.post("/students", function(req,res){
	students.save(req.body)
		.then (function (){
			res.end("guardado!");
		} , function () {
			res.end("mal!");
		});
		
	res.redirect("/students");
});

app.listen(3000);