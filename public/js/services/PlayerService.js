angular.module('PlayerService', []).factory('Player', ['Table', function(Table) {

  var current = {};

  return {
    joinTable: function(tableId) {
      Table.join(tableId);
    },
    isDealer: function() {
      return player.spot === 'D';
    },
    isActive: function() {
      return player.spot === Table.activeSpot();
    }
  };
}]);
