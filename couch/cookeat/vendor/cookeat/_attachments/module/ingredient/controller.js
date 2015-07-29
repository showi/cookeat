'use strict';

angular.module('cookeat-ingredient').controller(
  'IngredientCtrl',
  [
      '$scope',
      '$routeParams',
      'IngredientService',
      function IngredientCtrl($scope, $routeParams, Ingredient) {

        $scope.create = function() {
          console.log("Creating new recipe", Ingredient);
          Ingredient.create().then(function(response) {
            Ingredient.save();
          });
        };
        /**
         * Main
         * 
         * @note: Si le paramètre $routeParams.id est définis on affiche une
         */
        // recette sinon la liste des recettes.
        if ($routeParams.id === undefined) {
          $scope.ingredients = [];
          Ingredient.list().then(function(response) {
            console.log('Ingredient list', response);
            angular.copy(response.rows, $scope.ingredients);
          }, function(error) {
            console.error('Cannot list recipe');
          });
        } else {
          $scope.ingredient = {};
          Ingredient.get($routeParams.id).then(
            function(response) {
              angular.copy(response, $scope.ingredient);
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
  'IngredientCreateCtrl',
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
