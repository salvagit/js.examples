var http=require("http");

http.createServer(function(req, res){
	console.log(req);
	res.end("gracias por la visita");
}).listen(3000);