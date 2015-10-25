var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var app = express();

var sentJSONs = 0;

//app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(error, req, res, next) {
  res.status(400).send({ "error": "Could not decode req: JSON parsing failed" });
});



app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res) {
	var grabElement = req.body.grabElement;
	var urlString = req.body.urlString;
	var clicked = req.body.clicked;
	//console.log("------>" + req.body.param[0]);
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
			var scrapedData = "";
			$(grabElement).filter(function(){
		        var data = $(this);
				console.log("Grabbing Element");
				console.log("DATA: " + data);
				scrapedData = scrapedData + data.toString();
				scrapedData = scrapedData.replace(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/,'')
				//scrapedData = scrapedData.replace(/<../g,"");
				//scrapedData = scrapedData.replace(/..>/g,"");
	        })
			
			//scrapedData = scrapedData.replace(/<*>/g,"");
			console.log("TOTAL: " + scrapedData);
			
			
			fs.writeFile('public/myResults.txt', scrapedData, function (err) {
		  	if (err) return console.log(err);
			console.log('wrote data');
			});

			console.log(" -=-=- ");
		}else{
			console.log("error!");	
		}        
	})
}


app.listen(8080);
console.log("server on 8080");

