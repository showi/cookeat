'use strict';

angular.module('cookeat-couchdb', [
  'ngResource'
])
.value('CouchdbConfig', {
  db: 'cookeat',
  prefix: '/api',
  _url: function(url) { return this.prefix + '/' + this.db + url;  },
})
.factory('CouchdbViewService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/_design/cookeat/_view/:name'), {
        name : '@name'
      });
    }
])
.factory('CouchdbDocService', [
    '$resource', 'CouchdbConfig', function($resource, conf) {
      return $resource(conf._url('/:id'), {
        id : '@id'
      });
    }
])
.factory('CouchdbSessionService', ['$resource', 'CouchdbConfig', function($resource, conf) {
  return $resource('/_session');
}])
.factory('CouchdbService', [
    'CouchdbViewService', 'CouchdbDocService', function(View, Doc) {

      var Module = {
        view : function(name) {
          return View.get({name : name}).$promise;
        },
        doc: function(id) {
          return Doc.get({id: id}).$promise;
        }
      };

      return Module;
    }
]);
