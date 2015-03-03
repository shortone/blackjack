angular.module('TableService', [])
.factory('Table', ['$http', 'Shoe', 'socket', function($http, Shoe, socket) {

  // --
  // Constants
  var DEFAULT_ACTIVE_SPOT = 'D';
  // --

  var table = {};

  socket.on('table:joining', function(data) {
    // initialise u
  });

  socket.on('table:update', function(data) {
    console.log('updating table from server...');
    table = data;
  });

  return {
    create: function() {
      return $http.post('/api/tables', {
        shoe: Shoe.newDeck()
      });
    },
    exists: function(tableId) {
      // TODO sanitize entry
      return $http.get('/api/tables/' + tableId);
    },
    join: function(id) {
      socket.emit('table:get', {
        table: id
      });
      /*socket.emit('table:join', {
        table: id
      });*/
    },
    deal: function() {

    },
    activeSpot: function() {
      return table.activeSpot;
    }
  };
}]);
