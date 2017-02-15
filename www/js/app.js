// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'chart.js','ngResource','ngCordova','app.controllers', 'app.routes', 'app.services', 'app.directives'])


.constant('ApiEndPoint',{
url: 'http://localhost:8100/#/pagePin'})

.factory('Api', function($http, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function() {
    return $http.get(ApiEndpoint.url)
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      });
  };

  return {
    getApiData: getApiData
  };
})






.config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }])

.run(function($ionicPlatform,$ionicPopup) {
	// Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'Warning!',
        template: 'Are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	//Check Network Connection
	if(window.Connection) {
		if(navigator.connection.type == Connection.NONE) {
			$ionicPopup.confirm({
					title: 'No Internet Connection',
					content: 'To continue without Internet select OK'
				})
				.then(function(result) {
				if(!result) {
					ionic.Platform.exitApp();
				}
			});
		}
	}
	//End of Check Network Connection

  });
})