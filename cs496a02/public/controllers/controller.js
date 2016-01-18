
//https://www.youtube.com/watch?v=kHV7gOHvNdk
//MEAN Tutorial Part 1
var myApp = angular.module('myApp',[]);


//The controller is on the "front end"
//printing to console here goes to console in the http inspector
myApp.controller('AppCtrl',['$scope','$http', 
	function($scope, $http){
		console.log("Hello world from controller");
	
	//turn our get function into a 'refresh' function that we can use a lot
	var refresh = function() {
		
		//runs http get on /contactlist and returns response
		$http.get('/contactlist').success(function(response){
			
			console.log("I got the data I requested");
			
			//put response into the $scope
			$scope.contactlist = response;
			$scope.contact = "";//to clear the input boxes
		});
		
	};
	
	//run a refresh
	refresh();
		
	
	$scope.addContact = function(){
		//this was a test
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);//send response to the front-end console
			refresh(); //refresh the page
		});
	};
	
	$scope.remove = function(id){
		
		console.log(id);//this was a test
		//send this id to the back-end
		$http.delete('/contactlist/' + id).success(function(response){
			refresh(); //refresh on success
		});
	};
	
	$scope.edit = function(id){
		
		console.log(id);//this was a test
		//send this id to the back-end
		$http.get('/contactlist/' + id).success(function(response){
			
			console.log('got it!');
			$scope.contact = response;
			
		});
	};
	
	
	$scope.update = function(){
		
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	
	};
	
	$scope.deselect = function(){
		
		$scope.contact = "";
		
	}
	
	
	
		
		
}]);

//per angular website
//$scope is the glue between the application controller and html file




 