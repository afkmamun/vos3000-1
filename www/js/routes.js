angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('menu.vOSMaster', {
		  cache: false,
		url: '/pageCallnACD',
		views: {
		  'side-menu21': {
			templateUrl: 'templates/vOSMaster.html',
			controller: 'vOSMasterCtrl'
		  }
		}
	 })

  .state('menu.aCCManagement', {
    url: '/pageACC',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aCCManagement.html',
        controller: 'aCCManagementCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.onlineRouting', {
    url: '/pageOR',
    views: {
      'side-menu21': {
        templateUrl: 'templates/onlineRouting.html',
        controller: 'onlineRoutingCtrl'
      }
    }
  })

  .state('menu.onlineMapping', {
    url: '/pageOM',
    views: {
      'side-menu21': {
        templateUrl: 'templates/onlineMapping.html',
        controller: 'onlineMappingCtrl'
      }
    }
  })

  .state('menu.report', {
    url: '/pageReport',
    views: {
      'side-menu21': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      }
    }
  })

  .state('menu.routingGW', {
	cache: false,
    url: '/pageRGW',
    views: {
      'side-menu21': {
        templateUrl: 'templates/routingGW.html',
        controller: 'routingGWCtrl'
      }
    }
  })

  .state('menu.aCCPayment', {
    url: '/pageAP',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aCCPayment.html',
        controller: 'aCCPaymentCtrl'
      }
    }
  })

  .state('menu.aCCOverdraft', {
    url: '/pageOverdraft',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aCCOverdraft.html',
        controller: 'aCCOverdraftCtrl'
      }
    }
  })

  .state('menu.currentCall', {
	cache: false,
    url: '/pageCC',
    views: {
      'side-menu21': {
        templateUrl: 'templates/currentCall.html',
        controller: 'currentCallCtrl'
      }
    }
  })

  .state('menu.reportShow', {
    url: '/pageRS',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reportShow.html',
        controller: 'reportShowCtrl'
      }
    }
  })

  .state('menu.aCCDetails', {
    url: '/pageAD',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aCCDetails.html',
        controller: 'aCCDetailsCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/pageAbout',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })
  
  .state('menu.mySwitch', {
	cache: false,
    url: '/pageMySwitch',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mySwitch.html',
        controller: 'mySwitchCtrl'
      }
    }
  })

  /*.state('menu.logIn', {
    url: '/pageLogin',
    templateUrl: 'templates/logIn.html',
    controller: 'logInCtrl'
  })*/
 .state('menu.logIn', {
	cache: false,
    url: '/pageLogin',
	views: {
      'side-menu21': {
        templateUrl: 'templates/logIn.html',
        controller: 'logInCtrl'
      }
    }
  })

  .state('enterPIN', {
    url: '/pagePin',
    templateUrl: 'templates/enterPIN.html',
    controller: 'enterPINCtrl'
  })
  

$urlRouterProvider.otherwise('side-menu21/pageCC')

  

});