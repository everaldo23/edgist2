'use strict';

angular.module('edgist2App')
  .controller('MainCtrl', function ($scope, $auth, $state, $rootScope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.logOut = function () {
      $auth.signOut()
      .then(function(){
          $rootScope.signedIn = false;
          $state.go('index');
      })
    };
  });


