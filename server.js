var express = require('express');
var bodyParser = require('body-parser')


var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var app = express();

var sentJSONs = 0;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(error, req, res, next) {
  res.status(400).send({ "error": "Could not decode req: JSON parsing failed" });
});


app.get(/^(.+)$/, function(req, res){ 
   console.log('static file req : ' + req.params);
   res.sendFile( 'public/' + __dirname + req.params[0]); 
});

app.post('/', function(req, res) {
	
	var grabElement = req.body.grabElement;
	var urlString = req.body.urlString;
	var clicked = req.body.clicked;

	sentJSONs++;
	console.log("recieved-post: " + sentJSONs );
	res.json({ res: "res, you gave me: " + req.body.name });
	console.log("urlString: " + urlString + "   grabElement: " + grabElement + "  clicked: " + clicked);
	scrapeData(urlString, grabElement);
	res.end("yes");
});


function scrapeData(urlString, grabElement){
	console.log("attempting to scrape");
	request(urlString, function(error, response, html){
		if(!error){
			console.log("urlString:" + urlString + " grabElement: " + grabElement);
			var $ = cheerio.load(html);
			
			$(grabElement).filter(function(){
		        var data = $(this);
				console.log("Grabbing Element");
				console.log("DATA: " + data);
	        })

		}else{
			console.log("error!");	
		}        
	})
}


app.listen(8080);
console.log("server on 8080");

