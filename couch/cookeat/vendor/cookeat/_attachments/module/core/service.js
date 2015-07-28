'use strict';

angular.module('cookeat-core', [
  'ngResource'
])
.factory('EventService', ['$resource', function($resource) {
  return $resource('/_events/:id');
}]);  