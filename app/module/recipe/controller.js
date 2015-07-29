'use strict';

angular.module('cookeat-recipe').controller(
  'RecipeCtrl',
  [
      '$scope',
      '$routeParams',
      'RecipeService',
      function RecipeCtrl($scope, $routeParams, Recipe) {
        /**
         * Crée une nouvelle recette
         */
        $scope.create = function() {
          console.log("Creating new recipe", Recipe);
          Recipe.update({
            fn : 'recipe'
          }).then(function(response) {
            Recipe.save();
          });
        };
        /**
         * Main
         * 
         * @note: Si le paramètre $routeParams.id est définis on affiche une
         *        recette sinon la liste des recettes.
         */
        if ($routeParams.id === undefined) {
          // couch.view('recipe')
          Recipe.list().then(function(response) {
            $scope.recipes = angular.copy(response.rows);
          }, function(error) {
            console.error('Cannot list recipe');
          });
        } else {
          Recipe.get($routeParams.id).then(
            function(response) {
              $scope.recipe = angular.copy(response);
            },
            function(error) {
              console.error(
                'Cannot show recipe with id',
                $routeParams.id,
                ', error:',
                error);
            });
        }
      }
  ]).controller(
  'RecipeCreateCtrl',
  [
      '$scope', '$element', 'RecipeService', 'close',
      function RecipeCreateCtrl($scope, $element, Recipe, close) {
        /**
         * Ferme le modal
         */
        $scope.close = function(answer) {
          $element.modal('hide');
          close(answer);
        };
      }
  ]);
