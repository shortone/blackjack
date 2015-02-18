angular.module('TableService', [])
.factory('Table', ['socket', function(socket) {

  return {
    create: function() {
      return socket.emit('table:create', {}, function(data) {
        console.log(data);
        return '123';
      });
    }
  };
}]);
