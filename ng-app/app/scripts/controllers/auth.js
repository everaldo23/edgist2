'use strict';

angular.module('edgist2App')
  .controller('AuthCtrl', function ($rootScope,$scope,$auth,$state,$mdBottomSheet) {
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
        .then($scope.$on('auth:login-success',function(){
          $rootScope.signedIn = true;
          $mdBottomSheet.hide();
          $state.go('index');
        }))
    };
    $scope.showLoginBottomSheet = function ($event) {
      $mdBottomSheet.show({
        templateUrl:'views/login-bottom-sheet.html',
        targetEvent: $event
      });
    };
  });
