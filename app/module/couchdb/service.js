'use strict';

angular.module('cookeat-couchdb', [
  'ngResource'
]).value('CouchdbConfig', {
    db : '',
    prefix : '/api',
    design : 'cookeat',
    _url : function(url) {
      return this.prefix + url;
    },
}).factory('CouchdbViewService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/_design/:design/_view/:name'), {
          name : '@name',
          design : '@design',
      });
    }
]).factory('CouchdbListService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/_design/:design/_list/:name/:name'), {
          name : '@name',
          design : '@design',
      }, {
        get : {
            method : 'GET',
            cache : false,
            isArray : false,
            transformResponse : function(data, headersGetter) {
              console.log('data', data);
              var lines = data.split("\n");// .splice(0);// .split("\n");
              console.log('data type:', typeof (data), data);
              var result = [];
              for (var i = 0; i < lines.length; i++) {
                var json;
                try {
                  json = JSON.parse(lines[i]);
                } catch (error) {
                  console.error('Cannot parse line:', lines[i], error);
                  continue;
                }
                console.log('line', json);
                result.push(json);
              }
              return result;
            },
        }
      });
    }
]).factory('CouchdbDocService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/:id'), {
        id : '@id'
      });
    }
]).factory('CouchdbShowService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/_design/:design/_show/:name/<:id>'), {
          id : '@id',
          name : '@name',
          design : '@design',
      });
    }
]).factory('CouchdbUpdateService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/_design/:design/_update/:fn/<:id>'), {
          id : '@id',
          fn : '@fn',
          design : '@design'
      }, {
        create : {
            method : 'PUT',
            isArray : false
        }
      });
    }
]).factory('CouchdbSessionService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource('/_session');
    }
]).factory(
  'CouchdbService',
  [
      'CouchdbViewService', 'CouchdbListService', 'CouchdbDocService',
      'CouchdbUpdateService', 'CouchdbShowService',
      function(View, List, Doc, Update, Show) {

        var Module = {
            update : function(name, data) {
              if (data.id === undefined) { return Update.create({
                fn : name
              }, data).$promise; }
              return Update.update({
                  fn : name,
                  id : data.id
              }, data).$promise;
            },
            show : function(design, name, id) {
              var params = {
                  design : design,
                  name : name
              };
              if (id !== undefined) params['id'] = id;
              return Show.get(params).$promise;
            },
            view : function(design, name) {
              return View.get({
                  name : name,
                  design : design,
              }).$promise;
            },
            list : function(design, name) {
              return List.get({
                  name : name,
                  design : design,
              }).$promise;
            },
            doc : function(id) {
              return Doc.get({
                id : id
              }).$promise;
            }
        };

        return Module;
      }
  ]);
