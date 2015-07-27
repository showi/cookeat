'use strict';

angular.module('cookeat-recipe').controller(
  'RecipeCtrl',
  [
      '$scope', '$routeParams', 'RecipeService',
      function RecipeCtrl($scope, $routeParams, Recipe) {
        /** Crée une nouvelle recette
         */
        $scope.create = function() {
          console.log("Creating new recipe");
          Recipe.create();
        };
        /** Main
         * 
         * @note: Si le paramètre $routeParams.id est définis on affiche une
         * recette sinon la liste des recettes.
         */
        if ($routeParams.id === undefined) {
          //couch.view('recipe')
          Recipe.list().then(function(response) {
            $scope.recipes = angular.copy(response.rows);
          }, function(error) {
            console.error('Cannot list recipe, ', error);
          });
        } else {
          Recipe.get($routeParams.id).then(function(response) {
            $scope.recipe = angular.copy(response);
          }, function(error) {
            console.error('Cannot show recipe with id', $routeParams.id,
              ', error:', error);
          });
        }
      }
  ]).controller(
    'RecipeCreateCtrl',
    [
        '$scope', 'RecipeService', 'close',
        function RecipeCreateCtrl($scope, Recipe, close) {
          /** Ferme le modal
           */
          $scope.close = function(answer) {
           console.log('Closing modal');
           close(answer, 500);
          };
        }
    ]);
