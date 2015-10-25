


var scrapingByApp = angular.module('scrapingByApp', []);

scrapingByApp.controller('ScrapeCtrl', function($scope, $http){
	
	$scope.scrapeData = function(jsonData){
		
		console.log(" ScrapeCtrl : scrapeData() ");
		console.log("urlString: " + $scope.urlString);
		
		  $http.post("/echo/json/", data).success(function(data, status) {
          		$scope.hello = data;
		  });
	}
});