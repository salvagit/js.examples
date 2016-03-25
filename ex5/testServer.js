console.log("Class 5");

var querystring=require("querystring");
var http=require("http");

function testServer(){
	var postData = querystring.stringify({
	  'localidad' : '5001',
	  'calle': 'corrientes',
	  'altura': Math.floor(Math.random()*1000),
	  'provincia': 'C',
	  'action': 'cpa',
	  'ct_captcha': 'xxxx'
	});

	console.log(postData);

	var options = {
	  hostname: 'www.correoargentino.com.ar',
	  port: 80,
	  path: '/sites/all/modules/custom/ca_forms/api/ajax.php',
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	  }
	};

	var req = http.request(options, (res) => {
	  console.log(`STATUS: ${res.statusCode}`);
	  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

	  var aux="";
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
			aux+=chunk;
	  });

	  res.on('end', () => {
			console.log('No more data in response.', aux);
	  });

	});

	req.on('error', (e) => {
	  console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(postData);
	req.end();
}

for(var x=0; x<1000; x++)
testServer();
