'use strict';
/**
 * Application Cookeat
 */
angular.module(
  'cookeat',
  [
      /** external modules */
      'ngRoute', 'ngResource', 'ngCookies', 'ngAnimate', 'angularModalService',
      'xeditable',
      /** cookeat modules */
      'cookeat-recipe', 'cookeat-login', 'cookeat-core', 'cookeat-couchdb',
      'cookeat-tag', 'cookeat-ingredient',
  ]).config(
  [
      '$routeProvider',
      '$locationProvider',
      '$httpProvider',
      function($routeProvider, $locationProvider, $httpProvider) {
        /**
         * Nos routes
         */
        $routeProvider.when('/', {
          redirectTo : '/recipe/list'
        }).when('/recipe/list', {
            templateUrl : 'module/recipe/partial/list.html',
            controller : 'RecipeCtrl'
        }).when('/recipe/view/:id', {
            templateUrl : 'module/recipe/partial/show.html',
            controller : 'RecipeCtrl'
        }).when('/ingredient/list', {
            templateUrl : 'module/ingredient/partial/list.html',
            controller : 'IngredientCtrl'
        }).when('/ingredient/view/:id', {
            templateUrl : 'module/ingredient/partial/show.html',
            controller : 'IngredientCtrl'
        }).when('/tag/list', {
            templateUrl : 'module/tag/partial/tag.html',
            controller : 'TagCtrl'
        }).when('/login', {
            templateUrl : 'module/login/partial/login.html',
            controller : 'LoginCtrl'
        });
        /** Le prefix utilisé pour séparé les paramètre de l'url
         */
        $locationProvider.html5Mode(false).hashPrefix('!');

        $httpProvider.interceptors.push(function($rootScope, $location, $q) {
          /** Redirige l'utilisateur vers le login si il n'est pas authentifié
           */
          return {
              'request' : function(request) {
                // if we're not logged-in to the AngularJS app, redirect to
                // login page
                $rootScope.loggedIn =
                    $rootScope.loggedIn || $rootScope.username;
                if (!$rootScope.loggedIn && $location.path() != '/login') {
                  $location.path('/login');
                }
                return request;
              },
              'responseError' : function(rejection) {
                // if we're not logged-in to the web service, redirect to login
                // page
                if (rejection.status === 401 && $location.path() != '/login') {
                  $rootScope.loggedIn = false;
                  $location.path('/login');
                }
                return $q.reject(rejection);
              }
          };
        });
      }
  ]);
