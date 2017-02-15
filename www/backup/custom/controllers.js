angular.module('app.controllers', [])
  
.controller('vOSMasterCtrl', function($scope) {

})
   
.controller('aCCManagementCtrl', function($scope) {

})
      
.controller('onlineRoutingCtrl', function($scope) {
	$scope.routingData = [
	{
		routeID: 101,
		totalCall: 14
	},
	{
		routeID: 201,
		totalCall: 39
	}
	,
	{
		routeID: 303,
		totalCall: 405
	},
	{
		routeID: 402,
		totalCall: 3
	},
	{
		routeID: 501,
		totalCall: 0
	}]
	
	 function add(index) {
        //window.alert("Added: " + index);
    }

})
   
.controller('onlineMappingCtrl', function($scope) {
	$scope.mapData = [
	{
		customerName: "VS",
		totalCall: 140
	},
	{
		customerName: "TT",
		totalCall: 39
	},
	{
		customerName: "MP",
		totalCall: 120
	},
	{
		customerName: "TL",
		totalCall: 3
	},
	{
		customerName: "AS",
		totalCall: 0
	}]
	
	 function add(index) {
        //window.alert("Added: " + index);
    }

})
   
.controller('reportCtrl', function($scope) {

})
   
.controller('routingGWCtrl', function($scope) {

})
   
.controller('aCCPaymentCtrl', function($scope) {

})
   
.controller('aCCOverdraftCtrl', function($scope) {

})
   
.controller('currentCallCtrl', function($scope) {

})
   
.controller('reportShowCtrl', function($scope) {
	$scope.reportData = [
	{
		id: 101,
		totalCall: 1000,
		asr: 30,
		acd: 300
	},
	{
		id: 201,
		totalCall: 930,
		asr: 25,
		acd: 201
	},
	{
		id: 401,
		totalCall: 98,
		asr: 29,
		acd: 305
	}]
	
	 function add(index) {
        //window.alert("Added: " + index);
    }

})
   
.controller('aCCDetailsCtrl', function($scope) {
	$scope.data = [
	{
		id: "VC",
		od: 100,
		cb: 200
	},
	{
		id: "TT",
		od: 200,
		cb: 500
	},
	{
		id: "MP",
		od: 0,
		cb: -200
	}
	,
	{
		id: "TL",
		od: 400,
		cb: 200
	},
	{
		id: "AS",
		od: 1000,
		cb: -987
	}]
	
	 function add(index) {
        //window.alert("Added: " + index);
    }

})
   
.controller('aboutCtrl', function($scope) {

})
   
.controller('logInCtrl', function($scope) {

})
   
.controller('enterPINCtrl', function($scope) {

})
 