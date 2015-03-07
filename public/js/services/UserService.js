angular.module('UserService', []).factory('User', ['$q', function($q) {

  var user = {};

  return {
    init: function(table, role) {
      user.table = table;
      user.role = role;
    },
    getName: function() {
      return user.name;
    },
    setName: function(name) {
      user.name = name;
    },
    getRole: function() {
      return user.role;
    },
    getTable: function() {
      return user.table;
    },
    log: function() {
      console.log(user);
    }
  };
}]);
