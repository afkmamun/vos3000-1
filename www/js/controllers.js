angular.module('app.controllers', ['ionic','chart.js','ngResource','ngSanitize'])
  
 
/*.constant('ApiEndpoint', {
  url: 'http://localhost:8100/#/pagePin'
})

.factory('Api', function($http, ApiEndPoint) {
  alert('ApiEndpoint');

  var getApiData = function() {
	  alert("dsd");
    return $http.get(ApiEndpoint.url)
      .then(function(data) {
        alert('Got some data: ', data);
		alert(data);
        return data;
      });
	  alert("dsd");
  };

  return {
	  
    getApiData: getApiData
  };
})*/
 
.factory('ApiCall', function($http) {
    return {
        get: function(url2) {
		//	$ionicLoading.hide();
            return $http({
      
				url: url2,
				
                method: "GET"
            }); 
        }
    }
})
 

.constant('DEFAULT_URL',',%22username%22:%22admin%22,%22password%22:%22admin99%22,%22pin%22:%22admin%22,%22brand%22:%22VoiceLync%22}')
 
.controller('vOSMasterCtrl', function($scope,AccountDetails,RoutingDetails,MappingDetails,ApiCall,DataStore,$http,setURL,LiveCallDetails)
 {
	   $scope.labels = ["Live Calls", "Last Hour ACD", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  
	 console.log("Home");
	 //console.log(DataStore.liveCallData);
	 if(DataStore.liveCallData)
	 {
		// $scope.itemList=DataStore.liveCallData;
		// console.log(JSON.stringify($scope.itemList));
		 $scope.liveCalls=DataStore.liveCallData["Total Connected"];
		 $scope.lhACD=0;
	 }
	 else if(DataStore.ip)
	 {
		 //console.log("doRefresh");
			setURL.setURL1();
			setURL.setURL2();
			setURL.getLiveCallURL();
			LiveCallDetails.getLiveCalls(DataStore.url);
			//$scope.$broadcast('scroll.refreshComplete');
			
			setTimeout(function ()
			{
				$scope.$apply(function () {
					//$scope.data=DataStore.apiData;
					$scope.liveCalls=DataStore.liveCallData["Total Connected"];
					$scope.lhACD=0;
				});
			}, 2000);
		 
	 }
	 
	 
	 $scope.doRefresh = function() 
		{
			if(DataStore.ip)
			{
			console.log("doRefresh");
			setURL.setURL1();
			setURL.setURL2();
			setURL.getLiveCallURL();
			LiveCallDetails.getLiveCalls(DataStore.url);
			$scope.$broadcast('scroll.refreshComplete');
			
			setTimeout(function ()
			{
				$scope.$apply(function () {
					//$scope.data=DataStore.apiData;
					//$scope.itemList=DataStore.liveCallData;
					$scope.liveCalls=DataStore.liveCallData["Total Connected"];
					//console.log("INSIDE LIVE CALL:"+DataStore.liveCallData["Total Connected"]);
					$scope.lhACD=0;
				});
			}, 2000);
			}
			else{
				$scope.$broadcast('scroll.refreshComplete');
				
			}
			
		};
	 
	// loadAccDetails();
	 //loadRoutingDetails();
	 //loadMappingDetails();
	 
	 function loadAccDetails()
	 {
		 var url = "http://173.82.98.202:8161/vos/mobile/?q={%22operation%22:31,%22items%22:[[0]],%22username%22:%22admin%22,%22password%22:%22admin99%22,%22pin%22:%22admin%22,%22brand%22:%22VoiceLync%22}";
   
		if(!DataStore.apiData)
		{
			AccountDetails.getAccounts(url);			
		}
	 }		
		
	function loadRoutingDetails()
	{
		var url2 = "http://173.82.98.202:8161/vos/mobile/?q={%22operation%22:5,%22username%22:%22admin%22,%22password%22:%22admin99%22,%22pin%22:%22admin%22,%22brand%22:%22VoiceLync%22}";
		RoutingDetails.getRoutes(url2);
	  
	}
		
		
	function loadMappingDetails()
	{
		   
		var url3 = "http://173.82.98.202:8161/vos/mobile/?q={%22operation%22:6,%22username%22:%22admin%22,%22password%22:%22admin99%22,%22pin%22:%22admin%22,%22brand%22:%22VoiceLync%22}";
		MappingDetails.getMap(url3);
	  
	}

})
   
.controller('aCCManagementCtrl', function($scope) {

})
      
.controller('onlineRoutingCtrl', function($scope,ApiCall,DataStore,setURL,RoutingDetails) {
	console.log("ROUTINGGW CONTROL");
	$scope.doRefresh = function() 
	{
		console.log("doRefresh");
		setURL.setURL1();
		setURL.setURL2();
		setURL.getRoutingURL();
		RoutingDetails.getRoutes(DataStore.url);
		
		setTimeout(function ()
		{
			$scope.$apply(function () {
				$scope.routingItemList=DataStore.routingDataItems;
			});
		}, 2000);
		
		$scope.$broadcast('scroll.refreshComplete');
		
	};
	try
	{
		setURL.setURL1();
		setURL.setURL2();
		setURL.getRoutingURL();
		RoutingDetails.getRoutes(DataStore.url);
		$scope.routingItemList=DataStore.routingDataItems;
	}
	catch(error)
	{
		
	}
	
	
})
   
.controller('onlineMappingCtrl', function($scope,ApiCall,DataStore,setURL,MappingDetails) {
	
	$scope.doRefresh = function() 
	{
		console.log("doRefresh");
		setURL.setURL1();
		setURL.setURL2();
		setURL.getMappingURL();
		MappingDetails.getMap(DataStore.url);
		
		setTimeout(function ()
		{
			$scope.$apply(function () {
				 $scope.mappingItemList=DataStore.mappingDataItems;
			});
		}, 2000);
		
		$scope.$broadcast('scroll.refreshComplete');
		
	};
	try
	{
		setURL.setURL1();
		setURL.setURL2();
		setURL.getMappingURL();
		MappingDetails.getMap(DataStore.url);
		$scope.mappingItemList=DataStore.mappingDataItems;
	}
	catch(error)
	{
		
	}
	
})
   
.controller('reportCtrl', function ($scope,$state,$filter,setURL,DataStore,$ionicPopup,DEFAULT_URL,ApiCall,LoaderService)
 {
	$scope.input={};
	/*var date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	$scope.input.bgnTime=date;
	$scope.input.endfTime=date;*/
	
	
	try
	{
		$scope.data=DataStore.apiData;
		$scope.itemList=DataStore.apiDataItems;
		$scope.routeList=DataStore.routingDataItems;
	}
	catch(error)
	{
		
	}
	$scope.input.bDate=new Date();
	$scope.input.eDate=new Date();
	$scope.submitData=function(input)
	{
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Confirmation',
		 template: 'Are you sure?'
		});
	    confirmPopup.then(function(res) {
			if(res) {
				//console.log(input.selectedID);
				//console.log(input.amount);	
				//console.log(input.memo);	
				var bgnDate = $filter('date')(input.bDate, "yyyy-MM-dd");
				var endDate = $filter('date')(input.eDate, "yyyy-MM-dd");
				console.log(bgnDate+" "+endDate);
				
				
				
				if(!input.selectedAccID)
				{
					input.selectedAccID=0;
				}
				if(!input.selectedRoutingID)
				{
					input.selectedRoutingID=0;
				}
				if(!input.bTime)
				{
					bgnTime="00:00"
				}
				else
				{
					var bgnTime = $filter('date')(input.bTime, "HH:mm");
					
				}
				if(!input.eTime)
				{
					endfTime="00:00"
				}
				else
				{
					var endfTime = $filter('date')(input.eTime, "HH:mm");
				}
				
			
				
				console.log(bgnTime+" "+endfTime);
				var bgTime=bgnDate+" "+bgnTime+":00";
				var endTime=endDate+" "+endfTime+":00";
				
			//	var test="{%22operation%22:7,%22items%22:[["+input.selectedAccID+","+input.selectedRoutingID+","+0+",%22"+bgTime+"%22,%22"+endTime+"%22,%22"+input.coc+"%22]]";
				//console.log(test);
				setURL.setURL1();
				setURL.setURL2();
				//var dURL="{%22operation%22:7,%22items%22:[["+1+","+2+","+3+",%22"+4+"%22,%22"+5+"%22,%22"+6+"%22]]";
				var dURL="{%22operation%22:7,%22items%22:[["+input.selectedAccID+","+input.selectedRoutingID+","+0+",%22"+bgTime+"%22,%22"+endTime+"%22,%22"+input.coc+"%22]]";
				setURL.getReportURL(dURL);
				LoaderService.show();
				ApiCall.get(DataStore.url)
			   .success(function(data) {				
					console.log('Report Filtering Successful!');
					DataStore.reportData=data;
					DataStore.reportDataItems=data.items;
					console.log(JSON.stringify(data));
					LoaderService.hide();
					$state.go('menu.reportShow');
			   }).error(function(data,status){
				   console.log("Report Filtering Failed!");
				   LoaderService.hide();
				   
				  }); 
				  // 
			 } else {
			  // console.log('Deletion canceled !');
			 }
	   });
	 }
})
  

   
.controller('routingGWCtrl', function($scope,DataStore, setURL,$ionicPopup ,DEFAULT_URL,ApiCall,LoaderService) 
{
	 console.log("ROUTINGGW");
	 $scope.input={};
	 $scope.routingItemList=DataStore.routingDataItems;
	 //$scope.input.selectedID=DataStore.routingDataItems[0].[0];
	 console.log(JSON.stringify($scope.routingItemList));
	 $scope.submitData=function(input)
	 {
			
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Confirmation',
		 template: 'Are you sure?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				console.log(input.selectedID);
				console.log(input.capacity);
				var dURL="{%22operation%22:8,%22items%22:[["+input.selectedID+","+input.capacity+"]]";
				setURL.getRoutingGWURL(dURL);
				LoaderService.show();
				ApiCall.get(DataStore.url)
			   .success(function(data) {				
					$scope.input.amount="";
					$scope.input.capacity="";
					alert('Submission Successful!');
					LoaderService.hide();
			   }).error(function(data,status){
				   alert("Submission Failed!");
				   LoaderService.hide();
				   }); 
				   
			 } else {
			 }
	   });
	 }
})
  
   
.controller('aCCPaymentCtrl', function($scope,setURL,DataStore,$ionicPopup,DEFAULT_URL,ApiCall,AccountDetails,LoaderService) 
{
	
	 $scope.data=DataStore.apiData;
	 $scope.itemList=DataStore.apiDataItems;
	 $scope.submitData=function(input)
	 {
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Confirmation',
		 template: 'Are you sure?'
	 });
		confirmPopup.then(function(res) {
			if(res) {
				//console.log(input.selectedID);
				//console.log(input.amount);	
				//console.log(input.memo);	
				var dURL="{%22operation%22:32,%22items%22:[["+input.selectedID+",0,0,"+input.amount+",%22"+input.memo+"%22]]";
				setURL.getPaymentURL(dURL);
				LoaderService.show();
				ApiCall.get(DataStore.url)
			   .success(function(data) {				
					alert('Payment Submission Successful!');
					setURL.setURL1();
					setURL.setURL2();
					setURL.getAccountsURL();
					AccountDetails.getAccounts(DataStore.url);
					LoaderService.hide();
			   }).error(function(data,status){
				   alert("Payment Submission Failed!");
				   LoaderService.hide();
				   
				  }); 
				  // 
			 } else {
			  // console.log('Deletion canceled !');
			 }
		});
	}
})
   
.controller('aCCOverdraftCtrl', function($scope,setURL,DataStore,$ionicPopup,DEFAULT_URL,ApiCall,AccountDetails,LoaderService) {
	
	 $scope.data=DataStore.apiData;
	 $scope.itemList=DataStore.apiDataItems;
	 $scope.submitData=function(input)
	 {
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Confirmation',
		 template: 'Are you sure?'
	   });
	    confirmPopup.then(function(res) {
			if(res) {
				console.log(input.selectedID);
				console.log(input.amount);	
				console.log(input.memo);	
				var dURL="{%22operation%22:33,%22items%22:[["+input.selectedID+","+input.amount+"]]";
				setURL.getOverdraftURL(dURL);
				LoaderService.show();
				ApiCall.get(DataStore.url)
			   .success(function(data) {				
					alert('Overdraft Submission Successful!');
					setURL.setURL1();
					setURL.setURL2();
					setURL.getAccountsURL();
					AccountDetails.getAccounts(DataStore.url);
					LoaderService.hide();
			   }).error(function(data,status){
				   alert("Overdraft Submission Failed!");
				    LoaderService.hide();
					}); 
				  
			 } else {
			  // console.log('Deletion canceled !');
			 }
	   });
	 }

})
   
.controller('currentCallCtrl', function($scope,$state,DataStore,setURL,LiveCallDetails)
{
	console.log("current call");
	$scope.data = [1,1,1];
	//$scope.data = [1,1,1];
	$scope.liveCalls=0;
	$scope.processingCalls=0;
	$scope.connectedCalls=0;		
	if(DataStore.liveCallData)
	{
		console.log("if call");
		$scope.liveCalls=DataStore.liveCallData[0][0];
		$scope.processingCalls=DataStore.liveCallData[0][5];
		$scope.connectedCalls=DataStore.liveCallData[0][1];
		$scope.data = [$scope.liveCalls,$scope.processingCalls,$scope.connectedCalls];
		try{
			if(!DataStore.liveCallData)
			{
				$scope.data = [1,1,1];
				$scope.liveCalls=0;
				$scope.processingCalls=0;
				$scope.connectedCalls=0;		
			}
		}
		catch(error)
		{
				$scope.data = [1,1,1];
				$scope.liveCalls=0;
				$scope.processingCalls=0;
				$scope.connectedCalls=0;	
		}
	}
	else
	{
		console.log("else call");
		$scope.data = [1,1,1];
		$scope.liveCalls=0;
		$scope.processingCalls=0;
		$scope.connectedCalls=0;		
	}
	/*else
	{
		$scope.data = [1,1,1];
		$scope.liveCalls=0;
		$scope.processingCalls=0;
		$scope.connectedCalls=0;		
	}*/
	$scope.doRefresh = function() 
		{
			if(DataStore.ip)
			{
			console.log("doRefresh");
			setURL.setURL1();
			setURL.setURL2();
			setURL.getLiveCallURL();
			LiveCallDetails.getLiveCalls(DataStore.url);
			$scope.$broadcast('scroll.refreshComplete');
			
			setTimeout(function ()
			{
				$scope.$apply(function () {
					//$scope.data=DataStore.apiData;
					//$scope.itemList=DataStore.liveCallData;
					console.log("INSIDE CURRENT CALL REFRESH");
					if(DataStore.liveCallData)
					{
							$scope.liveCalls=DataStore.liveCallData[0][0];
							$scope.processingCalls=DataStore.liveCallData[0][5];
							$scope.connectedCalls=DataStore.liveCallData[0][1];
							$scope.data = [$scope.liveCalls,$scope.processingCalls,$scope.connectedCalls];
					}
				/*	else
					{
						$scope.liveCalls=0;
						$scope.processingCalls=0;
						$scope.connectedCalls=0;
					//	$scope.data = [$scope.liveCalls,$scope.processingCalls,$scope.connectedCalls];
						$scope.data = [1,1,1];
					}*/
					//console.log("INSIDE LIVE CALL:"+DataStore.liveCallData["Total Connected"]);
					$scope.lhACD=0;
				});
			}, 2000);
			}
			else{
				$scope.$broadcast('scroll.refreshComplete');
				
			}
		}
	$scope. colors = ['#3377FF','#8833FF','#FF0000'];
	$scope.labels = ["Total Call", "Processing Call", "Connected Call"];
	

})
   
.controller('reportShowCtrl', function($scope,DataStore) 
{
	$scope.data=DataStore.reportData;
	$scope.itemList=DataStore.reportDataItems;
	console.log("REORT SHOW : "+JSON.stringify($scope.itemList));

})
   
.controller('aCCDetailsCtrl', function($scope,setURL,$state,AccountDetails,ApiCall,DataStore, $http)
 {
	
		$scope.doRefresh = function() 
		{
			console.log("doRefresh");
			setURL.setURL1();
			setURL.setURL2();
			setURL.getAccountsURL();
			AccountDetails.getAccounts(DataStore.url);
			
			setTimeout(function ()
			{
				$scope.$apply(function () {
					$scope.data=DataStore.apiData;
					$scope.itemList=DataStore.apiDataItems;
				});
			}, 2000);
			
			$scope.$broadcast('scroll.refreshComplete');
			
		};
		try
		{
			var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
			
			var object_by_ip = $filter('filter')(switches, { ip:input.selectedSwitch })[0];
			DataStore.ip=object_by_ip.ip;
			DataStore.username=object_by_ip.username;
			DataStore.password1=object_by_ip.password;
			DataStore.pin=object_by_ip.pin;
			setURL.setURL1();
			setURL.setURL2();
			setURL.getAccountsURL();
			//console.log(DataStore.defaultURL1);
			//console.log(DataStore.defaultURL2);
			//alert(DataStore.url);
			AccountDetails.getAccounts(DataStore.url);
			$scope.itemList=DataStore.apiDataItems;
		}
		catch(error)
		{
			//alert("");
		}
	  
	//   $scope.itemList=$scope.demo;
	  // $scope.itemList=$scope.data.items;
	   //console.log(JSON.stringify(DataStore.apiData));
    
})
   
.controller('aboutCtrl', function($scope) {

})
   
.controller('logInCtrl', function($scope,$state,ApiCall,DataStore, $http,$filter,GetSwitchList,SwitchFactory) 
{
	//console.log(SwitchFactory.ip);
		$scope.input = {};
		$scope.input.ip=SwitchFactory.ip;
		$scope.input.username=SwitchFactory.username;
		$scope.input.password1=SwitchFactory.password1;
		$scope.input.pin=SwitchFactory.pin;

	
	
		//console.log(SwitchFactory.ip);
		console.log(SwitchFactory.mode);
	
	
	$scope.save=function(input)
	{
		if(input.pin&&input.ip&&input.username&&input.password1)
		{
			try
			{				//console.log("INSIDE TRY");
				/*var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
				var id = switches.length+1;*/
				if(SwitchFactory.mode=="add")
				{
					var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
					var id = switches.length+1;
					switches.push({"username": input.username,
						"password": input.password1,
						"pin": input.pin,
						"ip": input.ip,
						"id": id
						}
					);
					window.localStorage.setItem( 'switchInfo', JSON.stringify(switches));
					GetSwitchList.switches=switches;
				}
				else if(SwitchFactory.mode=="edit")
				{
					
					//var id2=
					var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
					var object_by_ip = $filter('filter')(switches, { ip:SwitchFactory.ip })[0];
					var id= object_by_ip.id;
					console.log(JSON.stringify(object_by_ip));
					// Remove a json element using filter
					//	console.log(JSON.stringify(switches));
					var ip1='!'+SwitchFactory.ip+'';
					//console.log(ip1);
					switches = $filter('filter')(switches, {ip: ip1}, true);
					
					//window.localStorage.setItem( 'switchInfo', JSON.stringify(switches));
					//GetSwitchList.switches=switches;
					
					//switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
					//var id= switches.length+2;
					switches.push({"username": input.username,
						"password": input.password1,
						"pin": input.pin,
						"ip": input.ip,
						"id": id
						}
					);
					window.localStorage.setItem( 'switchInfo', JSON.stringify(switches));
					GetSwitchList.switches=switches;
					
				}
				/* Remove a json element using filter
				switches = $filter('filter')(switches, {username: '!w'}, true)
				*/
				console.log(switches.length);
				
				//$window.location.reload();
				//console.log(switches[2].username);
			}
			catch(error)
			{
				//console.log("INSIDE CATCH");
				var data = [
					{ 
						"username": input.username,
						"password": input.password1,
						"pin": input.pin,
						"ip": input.ip,
						"id": 1
					}
				];
				window.localStorage.setItem( 'switchInfo', JSON.stringify(data));
				
			}
			console.log(window.localStorage.getItem( 'switchInfo' ));
		}
		
		$state.go('menu.mySwitch');
		
	};

})

.controller('mySwitchCtrl', function($scope,LoaderService,$ionicPopup,setURL,LiveCallDetails,AccountDetails,GetSwitchList,$filter,$state,$window,DataStore,SwitchFactory,MappingDetails,RoutingDetails)
 {
	 if(SwitchFactory.ActiveSwitch)
	 {
		$scope.activeSwitch=SwitchFactory.ActiveSwitch;
	 }
	 else
	 {
		$scope.activeSwitch="None";
	 }
	 
	 
	 try
	 {
		var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' )); 
		//console.log(JSON.stringify(switches));
		$scope.data2=switches;
		/*setTimeout(function ()
			{
				$scope.$apply(function () {
					 $scope.data2=switches;
				});
			}, 2000);*/
		//console.log(switches[0].ip);
	 }
	 catch(error)
	 {
		
	 }

	//console.log($scope.selected.favorite);
	$scope.refresh=function(input)
	{
		//$window.location.reload();
		try
			{
				var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
				
				var object_by_ip = $filter('filter')(switches, { ip:input.selectedSwitch })[0];
				DataStore.ip=object_by_ip.ip;
				DataStore.username=object_by_ip.username;
				DataStore.password1=object_by_ip.password;
				DataStore.pin=object_by_ip.pin;
				setURL.setURL1();
				setURL.setURL2();
				setURL.getAccountsURL();
				//console.log(DataStore.defaultURL1);
				//console.log(DataStore.defaultURL2);
				//alert(DataStore.url);
				AccountDetails.getAccounts(DataStore.url);
				setURL.getRoutingURL();
				RoutingDetails.getRoutes(DataStore.url);
				setURL.getMappingURL();
				MappingDetails.getMap(DataStore.url);
				setURL.getLiveCallURL();
				LiveCallDetails.getLiveCalls(DataStore.url);
				SwitchFactory.ActiveSwitch=input.selectedSwitch;
				$state.reload();
				//$window.location.href = DataStore.url;
				
				
			}
			catch(error)
			{
				console.log("INSIDE CATCH"+error);
			}
		//$state.reload();
	};
	$scope.add=function(input)
	{
		SwitchFactory.ip="";
		SwitchFactory.username="";
		SwitchFactory.password1="";
		SwitchFactory.pin="";
		SwitchFactory.mode="add";
	};
	
	$scope.changed=function(input)
	{
		//LoaderService.show();
		
		/*try
			{
				var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
				
				var object_by_ip = $filter('filter')(switches, { ip:input.selectedSwitch })[0];
				DataStore.ip=object_by_ip.ip;
				DataStore.username=object_by_ip.username;
				DataStore.password1=object_by_ip.password;
				DataStore.pin=object_by_ip.pin;
				setURL.setURL1();
				setURL.setURL2();
				setURL.getAccountsURL();
				//console.log(DataStore.defaultURL1);
				//console.log(DataStore.defaultURL2);
				//alert(DataStore.url);
				AccountDetails.getAccounts(DataStore.url);
				setURL.getRoutingURL();
				RoutingDetails.getRoutes(DataStore.url);
				setURL.getMappingURL();
				MappingDetails.getMap(DataStore.url);
				setURL.getLiveCallURL();
				LiveCallDetails.getLiveCalls(DataStore.url);
				//$window.location.href = DataStore.url;
				
				
			}
			catch(error)
			{
				console.log("INSIDE CATCH"+error);
			}*/
			//LoaderService.hide();
	};
	$scope.edit=function(input)
	{
		SwitchFactory.mode="edit";
		try
			{
				var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
				
				var object_by_ip = $filter('filter')(switches, { ip:input.selectedSwitch })[0];
				//console.log(JSON.stringify(object_by_ip));
				SwitchFactory.ip=object_by_ip.ip;
				SwitchFactory.username=object_by_ip.username;
				SwitchFactory.password1=object_by_ip.password;
				SwitchFactory.pin=object_by_ip.pin;
				
				//console.log(object_by_ip.password);
				//$window.location.reload();
			}
			catch(error)
			{
				//console.log("INSIDE CATCH"+error);
			}
	};
	$scope.delete=function(input)
	{
		//console.log(input.selectedSwitch);
		var confirmPopup = $ionicPopup.confirm({
		 title: 'Confirmation',
		 template: 'Are you sure?'
		});
	    confirmPopup.then(function(res) {
			if(res) 
			{
				try
				{
					var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' ));
					// Remove a json element using filter
				//	console.log(JSON.stringify(switches));
					var ip1='!'+input.selectedSwitch+'';
					//console.log(ip1);
					switches = $filter('filter')(switches, {ip: ip1}, true);
					
					window.localStorage.setItem( 'switchInfo', JSON.stringify(switches));
					console.log("Successfully Deleted");
					//$window.location.reload();
					$state.reload();
				}
				catch(error)
				{
					//console.log("INSIDE CATCH"+error);
				}
			} else 
			{
			  // console.log('Deletion canceled !');
			}
		});
		
	};

})


.controller('enterPINCtrl', function($scope, $http,$state,DataStore,ApiCall) 
{
	$scope.save=function(input)
	{
		DataStore.pin=input.pin;
		$state.go('logIn');		
	};	
})
 