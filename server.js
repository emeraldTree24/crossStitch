//Require packages
var http = require('http');
var url = require('url');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/";

var results = "";

//Connect to database and retrieve database contents
MongoClient.connect(dburl, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  //Choose database
  var dbo = db.db("CrossStitch");
  //Choose feilds
  dbo.collection("DMCthread").find({}, {projection: { _id: 0, 
  DMC: 1, Name: 1, Red: 1, Color: 1, }}).toArray(function(err, result){
	  if (err) throw err;
	  //Convert to JSON
	  results = JSON.stringify(result);
	  db.close();
  });
});

//Create server to listen at port 8080
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/"){
		//Open index.html and return contents
		fs.readFile('index.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	}else if(pathname == "/threads.js"){
		//If searching for threads.js output JSON database results
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end("{\"data\":" + results + "}");
	}else{
		//For all other requests return the file requested
		if (pathname.indexOf('/') == 0){
            filename = pathname.substring(1);
        }else{
			filename = pathname;
		}
		fs.readFile(filename, function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	}  
}).listen(8080);