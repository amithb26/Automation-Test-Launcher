var NOS = angular.module('NOS', []);


	
NOS.controller('NOSController', function($scope,$http)
	{
	$scope.testbedshow=false;
	$scope.availableshow = false;
    $scope.imageshow= false;
    $scope.TBstatus = "";
	$scope.TBList = [];
    $scope.valChangedPT = false;
    $scope.dataPT = {selectedPT: ""};
    $scope.valChangedTB = false;
    $scope.dataTB = {selectedTB: ""};
    $scope.imageloc = "";
    $scope.resdata = "";
    $scope.requestStatus = "";
    $scope.baseURL = "http://localhost:8081/SR_Server/rest/";
// HTTP GET request to get the list of available protocol suites
    $http.get($scope.baseURL + "getTBMap")
      .then(function successCallback(response)
	   {
        $scope.protocols = Object.keys(response.data.TestBedMap);
	   },function errorCallback(response)
		{
			$scope.dataPT.selectedPT="GET Request Failed";
                $scope.requestStatus = "Error occured during http GET" ;
		    	$scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.responsetext = Response.responseText;
		    	$scope.headers = Response.headers();
		});
// Functions for selecting Protocol
    $scope.PTtoggle = function() {
        if (!$scope.valChangedPT) {
        	$scope.testbedshow= false;
            $scope.imageshow= false;
        	$scope.availableshow = false;
            $scope.TBstatus = "";
        	$scope.dataPT.selectedPT="None";
        	$scope.dataTB.selectedTB="None";
		    $scope.responsetext = "";
	        $scope.statusval = "";
	    	$scope.statustext = "";
	    	$scope.headers = "";
	    	$scope.requestStatus = "";
         }
        $scope.valChangedPT = false;
      };
    $scope.PTchangefn = function(){
	    $scope.responsetext = "";
  	    $scope.requestStatus = "";
            $scope.statusval = "";
	    $scope.statustext = "";
	    $scope.headers = "";
        $scope.valChangedPT = true;
    	$scope.dataTB.selectedTB="None";
    	$scope.availableshow = false;
    	$scope.testbedshow= true;
    	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
		   {
			$scope.TBList= response.data.TestBedMap[$scope.dataPT.selectedPT];
		   },function errorCallback(response)
			{
		        $scope.dataPT.selectedPT="GET Request Failed";
		        $scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In Protocol Selection Function]Error occured during http GET" ;
		    	$scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.responsetext = Response.responseText;
		    	$scope.headers = Response.headers();

			});
      };
// Functions for selecting Testbed
      $scope.TBtoggle = function() {
          if (!$scope.valChangedTB) {
              $scope.imageshow= false;
          	  $scope.availableshow = false;
              $scope.TBstatus = "";
          	  $scope.dataTB.selectedTB="None";
	    	  $scope.requestStatus = "";
	          $scope.statusval = "";
	    	  $scope.statustext = "";
	    	  $scope.headers = "";
		      $scope.responsetext = "";
           }
          $scope.valChangedTB = false;
        };
      $scope.TBchangefn = function(){
          $scope.valChangedTB = true;
          $scope.imageshow= true;
      	  $scope.availableshow = true;
	      $scope.responsetext = "";
  	      $scope.requestStatus = "";
          $scope.statusval = "";
	      $scope.statustext = "";
	      $scope.headers = "";
	      $http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
		     {
                 $scope.TBstatus = response.data.Status[$scope.dataTB.selectedTB];
		     },function errorCallback(response)
		     {
		    	 $scope.TBstatus="Failure";
			  });
        };
// Function to reserve testbed
        $scope.reserveTB = function(){
        	var chosenTB = {
	    			testbed: $scope.dataTB.selectedTB,
	    			state  : "Reserved"
	    	};
        	$http.post($scope.baseURL + 'setTBStatus', chosenTB, 
	    			{headers: {'Content-Type': 'application/json',
		    	'Access-Control-Allow-Origin': '*',
		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
		    .then( function successCallback(Response)
		    {
		    	
		    	if (Response.data){
		    		$scope.requestStatus = Response.data;
		    		
		    	};
		    	//$scope.sleep(1000);
		    	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
		 		   {
		                $scope.TBstatus = response.data.Status[$scope.dataTB.selectedTB];
		 		   },function errorCallback(response)
		 			{
				    	 $scope.TBstatus="Failure";
		 			});
		    },
		    function errorCallback(Response)
		    {
		    	$scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In reserve function]Error occured during http post:";
		    	$scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.headers = Response.headers;
		    });
        };
// Function to release testbed
        $scope.releaseTB = function(){
        	var chosenTB = {
	    			testbed: $scope.dataTB.selectedTB,
	    			state  : "Available"
	    	};
        	$http.post($scope.baseURL + 'setTBStatus', chosenTB, 
	    			{headers: {'Content-Type': 'application/json',
		    	'Access-Control-Allow-Origin': '*',
		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
		    .then( function successCallback(Response)
		    {
		         if (Response.data){
		    		$scope.requestStatus = Response.data;
		    	};
		    	//$scope.sleep(1000);
	        	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
	 		   {
	                $scope.TBstatus = response.data.Status[$scope.dataTB.selectedTB];
	 		   },function errorCallback(response)
	 			{
			    	 $scope.TBstatus="Failure";
	 			});
		    },
		    function errorCallback(Response)
		    {
		    	$scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In release function]Error occured during http post:"; 
		        $scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.headers = Response.headers;
		    });
        	
        };
// Function for sleep
        $scope.sleep = function sleep(milliseconds) {
        	  var start = new Date().getTime();
        	  for (var i = 0; i < 1e7; i++) {
        	    if ((new Date().getTime() - start) > milliseconds){
        	      break;
        	    }
        	  }
        	}
// HTTP request to execute the command
	$scope.launch = function()
	    {
	    	
	    	var payload = {
	    			Protocol: $scope.dataPT.selectedPT,
	    			Testbed: $scope.dataTB.selectedTB,
	    			Path : $scope.imageloc
	    	            };
	    	$http.post($scope.baseURL + 'execute', payload, 
	    			{headers: {'Content-Type': 'application/json',
		    	'Access-Control-Allow-Origin': '*',
		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
		    .then( function successCallback(Response)
		    {
		    	if (Response.data)
		    		$scope.requestStatus = Response.data;
		    	
		    },
		    function errorCallback(Response)
		    {
		    	$scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In launch Function]Error occured during http post:" ;
		    	$scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.responsetext = Response.responseText;
		    	$scope.headers = Response.headers();
		    })
	    };
	  });