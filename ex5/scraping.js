var http = require('http');

var getAlgo  = function(search, cb){
    var body = "";
    http.get("http://www.preciosderemedios.com.ar/resultado_busq.php?pattern="+search+"&item=product", function(res){
        res.on('data', function(data){
              body +=data;
        });
        res.on('end', function(){
           cb(body);
        });
    });
};

http.createServer(function (req, res) {

    (function(url){
        req.query = {};
        if(url.indexOf("?")==-1) return false;
        url = url.replace("?", "");
        url = url.split("/").join("");
        var pars  = url.split("&");
        for(var x=0; x<pars.length; x++){
            var kv = pars[x].split("=");
            req.query[kv[0]] = kv[1];
        }//end for
    })(req.url);

    var send = function(str){
        console.log("Nuevo pedido: ", req.url);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(str+'\n');
    };

    getAlgo(req.query.query|| "nodejs", function(body){
		    console.log(body);
        send(body);
    });

}).listen(1234);

console.log('Servidor corriendo en el puerto 1234');
