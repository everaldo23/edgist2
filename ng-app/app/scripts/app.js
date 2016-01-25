'use strict';


  angular.module('edgist2App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
    'ng-token-auth',
  'ui.router',
    'ngMaterial',
    'xeditable'
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
      })
      .state('/product', {
        url: '/products',
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
      });
      $httpProvider.defaults.withCredentials = true;
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
    $mdThemingProvider.theme('dark')
      .primaryPalette('yellow')
      .dark();
    $authProvider.configure({
      apiUrl: 'http://localhost:3000'
    });
  })
    .run(function($auth, $rootScope, editableOptions, editableThemes){
      editableOptions.theme = 'default';
      editableThemes['default'].controlsTpl= '<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>';
      editableThemes['default'].submitTpl = '<md-button class="md-fab md-mini md-raised md-primary" aria-label="Edit" type="submit"><md-icon md-svg-icon="images/check.svg"></md-icon></md-button>';
      editableThemes['default'].cancelTpl = '<md-button class="md-fab md-mini md-raised md-accent" aria-label="Cancel" type="button" ng-click="$form.$cancel()"><md-icon md-svg-icon="images/clear.svg"></md-icon></md-button>';
      console.log($auth.validateUser());
      $rootScope.$on('auth:validation-success', function(){
        $rootScope.signedIn = true;
      });
    });




