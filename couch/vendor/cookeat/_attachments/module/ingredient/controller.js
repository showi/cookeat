'use strict';

angular.module('cookeat-ingredient').controller(
  'IngredientCtrl',
  [
      '$routeParams', '$scope', 'CouchdbService',
      function IngredientListCtrl($routeParams, $scope, couch) {
        if ($routeParams.id === undefined) {
          couch.view('ingredient').then(function(response) {
            $scope.ingredients  = angular.copy(response.rows); 
          }, function(error) {
            console.error('Cannot list ingredient,', error);
          });
        } else {
          couch.doc($routeParams.id).then(function(response) {
            $scope.ingredient = angular.copy(response);
          }, function(error) {
            console.error('Cannot show ingredient with id:', 
              $routeParams.id, ', error:', error);
          });
        }
      }
  ]);
