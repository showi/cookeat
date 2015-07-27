'use strict';

angular.module('cookeat-tag').controller(
  'TagCtrl',
  [
      '$scope', '$rootScope', '$location', 'CouchdbService',
      function TagCtrl($scope, $rootScope, $location, couch) {
        $scope.tags = ['recette', 'pain', 'france'];
        couch.view('tag').then(function(response) {
          $scope.tags = response.rows;
        }, function(error) {
          ;
        });
      }
  ]);