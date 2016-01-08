'use strict';


  angular.module('edgist2App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
    'ng-token-auth',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
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
        controller: function($scope, $auth, $state){
          $scope.register = function () {
            $auth.submitRegistration({
              email: $scope.email,
              password: $scope.password,
              password_confirmation: $scope.password
            })
              .then(function(){
                $state.go('index');
              });
          };
          $scope.login = function (){
            $auth.submitLogin({
              email: $scope.email1,
              password: $scope.password1
            })
              .then(function(){
                $state.go('index');
              });
          };
        }
      });
      $httpProvider.defaults.withCredentials = true;

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




