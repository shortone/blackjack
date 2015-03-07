angular.module('TableService', [])
.factory('Table', ['$http','$q', 'Shoe','User', 'socket', function($http, $q, Shoe, User, socket) {

  var RoleEnum = {
    DEALER: 'Dealer',
    PLAYER: 'Player'
  };

  var table = {};

  var update = function() {
    socket.emit('table:update', table);
  };

  socket.on('table:update', function(data) {
    console.log('updating table from server...');
    table = data;
    console.log(table);
  });

  return {
    RoleEnum: RoleEnum,

    init: function(id) {
      return $q(function(resolve, reject) {
        $http.get('/api/tables/' + id).then(function(payload) {
          table = payload.data[0];
          // set name of user
          if (!table.dealer) {
            User.init(table._id, RoleEnum.DEALER);
            table.dealer = {
              spot: 'Dealer',
              cards: []
            };
          } else {
            User.init(table._id, RoleEnum.PLAYER);
            User.setName('Player ' + (table.players.length + 1));
            table.players.push({
              spot: User.getName(),
              cards: []
            });
          }
          // --
          // TODO properly sync with the server
          update();
          // --
          resolve();
          console.log(table);
        });
      });
    },
    create: function() {
      table = {
        shoe: Shoe.newDeck()
      };
      return $http.post('/api/tables', table);
    },
    deal: function() {
      var giveCards = function(player, nb) {
        for (var i = 0; i < nb; i++) {
          player.cards.push(table.shoe.shift());
        }
      };
      giveCards(table.dealer, 2);
      _.each(table.players, function(elm, idx) {
        giveCards(elm, 2);
      });

      // --
      update();
      // --
    },
    getDealer: function() {
      return table.dealer;
    },
    getPlayers: function() {
      return table.players;
    },
    log: function() {
      console.log(table);
    }
  };
}]);
