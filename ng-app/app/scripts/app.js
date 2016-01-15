'use strict';


  angular.module('edgist2App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
    'ng-token-auth',
  'ui.router',
    'ngMaterial'
])
  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $mdThemingProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
      .state('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      });
      $httpProvider.defaults.withCredentials = true;
    $mdThemingProvider.theme('default')
      .accentPalette('red')
      .dark();
    $authProvider.configure({
      apiUrl: 'http://localhost:3000'
    });
  })
    .run(function($auth, $rootScope){
      console.log($auth.validateUser());
      $rootScope.$on('auth:validation-success', function(){
        $rootScope.signedIn = true;
      });
    });




