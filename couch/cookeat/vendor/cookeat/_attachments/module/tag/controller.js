'use strict';

angular.module('cookeat-tag').controller(
  'TagCtrl',
  [
      '$scope', '$rootScope', '$location', 'TagService',
      function TagCtrl($scope, $rootScope, $location, Tag) {
        $scope.tags = [];
        Tag.list().then(function(response) {
          $scope.tags = response.rows;
        }, function(error) {
          ;
        });
      }
  ]);
