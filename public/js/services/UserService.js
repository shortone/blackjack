angular.module('UserService', []).factory('user', ['$q', 'Table', function($q, Table) {

  var currentUser = {};

  var createdTables = [];

  return {
    createTable: function() {
      return $q(function(resolve, reject) {
        Table.create().success(function(data, status, headers, config) {
          // TODO find a way to initialise the user state
          resolve(data._id);
        }).error(function(data, status, headers, config) {
          // TODO handle error properly
          console.log('Error: ' + data);
          reject();
        });
      });
    },
    joinTable: function(tableId) {
      return $q(function(resolve, reject) {
        Table.exists(tableId).success(function(data, statatus, headers, config) {
          resolve(data._id);
        }).error(function(data, status, headers, config) {
          console.log('Error: ' + data);
          reject();
        });
      });
    }
  };
}]);
