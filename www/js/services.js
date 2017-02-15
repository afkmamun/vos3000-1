angular.module('app.services', ['ngResource'])


.factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {
     };
		
	var pin="admin";
	var username="admin";
	var password1="admin99";
	var ip="173.82.98.202:8161";
	var defaultIP="173.82.98.202:8161";
	
	var liveCallData;
	
	var apiData;
	var apiDataItems;

	var routingData;
	var routingDataItems;
	
	var mappingData;
	var mappingDataItems;
	
	var reportData;
	var reportDataItems;
	
	var defaultURL1;//= "http://173.82.98.202:8161/vos/mobile/?q=";
	var defaultURL2;//="%22username%22:%22admin%22,%22password%22:%22admin99%22,%22pin%22:%22admin%22,%22brand%22:%22VoiceLync%22}";
	var url;
	
	
	//alert(pin);
    return DataStore;
})

.factory('GetSwitchList', [function()
{
	 var switches='';
	 try
	 {
		//console.log("INSIDE TRY");
		var switches=JSON.parse( window.localStorage.getItem( 'switchInfo' )); 
		console.log(JSON.stringify(switches));
		//$scope.data2=switches;
		//console.log(switches[0].ip);
	 }
	 catch(error)
	 {
		// console.log("INSIDE CATCH ERROR");
		
	 }
	 
	 return switches;

}])

/*.factory('Account', getAccount)*/

.service('setURL', ['DataStore',function(DataStore) 
{
	//var accounts={};
	
	this.setURL1=function() 
	{		  
		DataStore.defaultURL1="http://"+DataStore.ip+"/vos/mobile/?q=";
    }
	this.setURL2=function() 
	{		  
		DataStore.defaultURL2="%22username%22:%22"+DataStore.username+"%22,%22password%22:%22"+DataStore.password1+"%22,%22pin%22:%22"+DataStore.pin+"%22,%22brand%22:%22VoiceLync%22}";
    }
	this.getAccountsURL=function() 
	{		  
		DataStore.url=DataStore.defaultURL1+"{%22operation%22:31,%22items%22:[[0]],"+DataStore.defaultURL2;
    }
	this.getRoutingURL=function() 
	{		  
		DataStore.url=DataStore.defaultURL1+"{%22operation%22:5,"+DataStore.defaultURL2;
    }
	this.getMappingURL=function() 
	{		  
		DataStore.url=DataStore.defaultURL1+"{%22operation%22:6,"+DataStore.defaultURL2;
    }
	this.getPaymentURL=function(dURL) 
	{		  
		DataStore.url=DataStore.defaultURL1+dURL+DataStore.defaultURL2;
    }
	this.getOverdraftURL=function(dURL) 
	{		  
		DataStore.url=DataStore.defaultURL1+dURL+DataStore.defaultURL2;
    }
	this.getRoutingGWURL=function(dURL) 
	{		  
		DataStore.url=DataStore.defaultURL1+dURL+DataStore.defaultURL2;
    }
	this.getReportURL=function(dURL) 
	{		  
		DataStore.url=DataStore.defaultURL1+dURL+DataStore.defaultURL2;
    }
	this.getLiveCallURL=function() 
	{		  
		DataStore.url=DataStore.defaultURL1+"{%22operation%22:21,"+DataStore.defaultURL2;
    }
	this.getTotalCallURL=function() 
	{		  
		DataStore.url=DataStore.defaultURL1+"{%22operation%22:21,"+DataStore.defaultURL2;
    }
	 // return accounts;
   }
])


.service('LiveCallDetails', ['ApiCall','DataStore','LoaderService',function(ApiCall,DataStore,LoaderService) 
{
	//var accounts={};
	
	
	this.getLiveCalls=function(url) 
	  {	  
		  LoaderService.show();
		  ApiCall.get(url)
		   .success(function(data)
		   {
			   console.log(JSON.stringify(data));
				DataStore.liveCallData=data.items;
				//DataStore.apiDataItems=data.items;
				LoaderService.hide();
				//return data;
		
		   }).error(function(data,status)
		   {
			   alert("Failed to load Live Calls");
			   LoaderService.hide();
		  // return data;
		   }).then()
		   {
			  // LoaderService.hide();
		   };
      }
	 // return accounts;
   }
])

.service('AccountDetails', ['ApiCall','DataStore','LoaderService',function(ApiCall,DataStore,LoaderService) 
{
	//var accounts={};
	
	
	this.getAccounts=function(url) 
	  {	  
		  LoaderService.show();
		  ApiCall.get(url)
		   .success(function(data)
		   {
			   console.log(JSON.stringify(data));
				DataStore.apiData=data;
				DataStore.apiDataItems=data.items;
				LoaderService.hide();
				//return data;
		
		   }).error(function(data,status)
		   {
			   alert("Failed to load Account Details");
			   LoaderService.hide();
		  // return data;
		   }).then()
		   {
			  // LoaderService.hide();
		   };
      }
	 // return accounts;
   }
])

.service('RoutingDetails', ['ApiCall','DataStore','LoaderService',function(ApiCall,DataStore,LoaderService) 
{
	//var accounts={};
	
	this.getRoutes=function(url) 
	  {
		  LoaderService.show();
		  ApiCall.get(url)
		   .success(function(data)
		   {
			    //console.log(JSON.stringify(data));
				DataStore.routingData=data;
				DataStore.routingDataItems=data.items;
				console.log(JSON.stringify(data));
				LoaderService.hide();
			//	return data;
		
		   }).error(function(data,status)
		   {
			   alert("Failed to load Routing Data");
			   LoaderService.hide();
		  // return data;
		   });
      }
	 // return accounts;
   }
])

.service('MappingDetails', ['ApiCall','DataStore','LoaderService',function(ApiCall,DataStore,LoaderService) 
{
	//var accounts={};
	
	this.getMap=function(url) 
	  {
		  LoaderService.show();		  
		  ApiCall.get(url)
		   .success(function(data)
		   {
			   //console.log(JSON.stringify(data));
				DataStore.mappingData=data;
				DataStore.mappingDataItems=data.items;
				console.log(JSON.stringify(data));
				LoaderService.hide();
			//	return data;
		
		   }).error(function(data,status)
		   {
			   alert("Failed to load Mapping data");
			   LoaderService.hide();
		  // return data;
		   });
      }
	 // return accounts;
   }
])

.service('Payment', ['ApiCall','DataStore','LoaderService','setURL','AccountDetails',function(ApiCall,DataStore,LoaderService,AccountDetails,setURL) 
{
	//var accounts={};
	
	this.updatePayment=function(url) 
	  {
		 
      }
	 // return accounts;
   }
])

.factory('SwitchFactory', [function()
{
	 var SwitchFactory = {
     };
	var pin="";
	var username="";
	var password1="";
	var ip;
	var id;
	var mode;
	var ActiveSwitch;
	return SwitchFactory;

}])

.service('MySwitchService', [function()
{
	
	
}])

.factory('LoaderService', function($rootScope, $ionicLoading) {
  return {
        show : function() {

            $rootScope.loading = $ionicLoading.show({

              // The text to display in the loading indicator
              content: '<i class="icon ion-looping"></i> Loading',

              // The animation to use
              animation: 'fade-in',

              // Will a dark overlay or backdrop cover the entire view
              showBackdrop: true,

              // The maximum width of the loading indicator
              // Text will be wrapped if longer than maxWidth
              maxWidth: 200,

              // The delay in showing the indicator
              showDelay: 10
            });
        },

        hide : function(){
            $ionicLoading.hide();
        }
    }
})


.service('BlankService', [function(){

}]);
//

