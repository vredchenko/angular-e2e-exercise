'use strict';

angular.module('numberDuplicatesApp')
  .service('numberListService', ['$resource', function($resource) {
    var endpointUrl = 'http://127.0.0.1:5000';
    return $resource(endpointUrl, null, {
      'get': {
        method: 'GET',
        isArray: true
      }
    });
  }]);