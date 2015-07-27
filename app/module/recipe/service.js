'use strict';

angular.module('cookeat-recipe', [
  'cookeat-couchdb',
  'angularModalService',
  'cookeat-recipe'
]).factory(
  'RecipeService',
  [
      '$resource', '$routeParams', 'ModalService', 'CouchdbService',
      function($resource, $routeParams, Modal, Couch) {
        return {
          list: function() {
            return Couch.view('recipe').catch(
                function(error) {
                  console.error('Cannot list recipe, ', error);
                });
          },
          get: function(id) {
            return Couch.doc($routeParams.id).catch(
            function(error) {
              console.error('Cannot show recipe with id', $routeParams.id,
                ', error:', error);
            });
          },
          create : function() {
            Modal.showModal({
                templateUrl : "/app/module/recipe/partial/create.html",
                controller : "RecipeCreateCtrl"
            }).then(function(modal) {
              console.log('In modal', modal);
              // The modal object has the element built, if this is a bootstrap
              // modal
              // you can call 'modal' to show it, if it's a custom modal just
              // show or hide
              // it as you need to.
              modal.element.modal();
              modal.close.then(function(result) {
//                $scope.message = result ? "You said Yes" : "You said No";
                console.log('Modal closed', result);
              });
            });
          },
        };
      }
  ]);
