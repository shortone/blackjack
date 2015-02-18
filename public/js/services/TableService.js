angular.module('TableService', [])
.factory('Table', ['$http', function($http) {

  return {
    create: function() {
      return $http.post('/api/tables', {});
    }
  };
}]);
