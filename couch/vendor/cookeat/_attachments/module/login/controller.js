'use strict';

angular.module('cookeat-login').controller(
  'LoginCtrl',
  [
      '$scope', '$rootScope', '$location', 'CouchdbSessionService',
      function LoginCtrl($scope, $rootScope, $location, SessionService) {

        $scope.user = {
            name : 'cookeat',
            password : 'cookme'
        };

        $scope.form = {
          enabled : true,
        };

        $scope.login = function() {
          $scope.form.enable = false;
          $scope.user = SessionService.save($scope.user, function(response) {
            $rootScope.loggedIn = true;
            $location.path('/');
            console.log('login success', response);
          }, function(error) {
            $scope.loginError = true;
            console.error('login error', error);
          });
        };
        
        $scope.logout = function() {
          $rootScope.loggedIn = false;
        };
      }
  ]);