var _ = require('underscore');

var Table = require('./models/table');

module.exports = function(io) {

  io.on('connection', function(socket) {
    socket.on('table:update', function(data) {
      // initialise the channel to be used during broadcast
      if (!socket.table) {
        socket.table = data._id;
        socket.join(data._id);
      }

      Table.find({'_id': data._id}, function(err, doc) {
        if (err) {
          // TODO properly handle errors
          return;
        }
        var table = doc[0];
        table.shoe = data.shoe;
        table.players = data.players;
        table.dealer = data.dealer;
        table.save(function(err) {
          if (err) {
            // TODO properly handle errors
            return;
          }
          // once the table properly saved, broadcast the updated content to the other members of the table
          socket.broadcast.to(data._id).emit('table:update', table);
        });
        //socket.broadcast.to(table._id).emit('table:console', player.username + ' received ' + pickedCard.name + pickedCard.suit);
      });
    });

    socket.on('table:get', function(data) {
      socket.table = data.table;
      socket.join(data.table);

      Table.find({'_id': socket.table}, function(err, doc) {
        if (err) {
          // TODO handle error properly
          return;
        }
        socket.emit('table:update', doc);
      });
    });

    socket.on('table:join', function(data) {
      socket.table = data.table;
      socket.join(data.table);

      // Handle dealer and players connections with username
      var PLAYERS = ['Dealer', 'Player 1', 'Player 2', 'Player 3', 'Player 4'];

      Table.find({'_id': socket.table}, function(err, doc) {
        if (err) {
          // TODO handle error properly
          return;
        }
        var table = doc[0];
        // TODO handle case where there's no more room on the table
        socket.username = PLAYERS[table.players.length];

        table.players.push({
          username: socket.username
        });

        socket.emit('table:console', 'you are connected to the table ' + data.table);
        socket.emit('table:username', socket.username);
        socket.broadcast.to(data.table).emit('table:console', socket.username + ' has joined the table');
        // TODO handle player deconnection

        table.save();
      });
    });

    var dealCards = function(table, player, nbCards) {
      for(var i = 0; i < nbCards; i++) {
        var pickedCard = table.shoe.shift();
        player.cards.push(pickedCard);
        socket.broadcast.to(table._id).emit('table:console', player.username + ' received ' + pickedCard.name + pickedCard.suit);
        socket.emit('table:console', 'you received ' + pickedCard.name + pickedCard.suit);
      }
    }

    socket.on('table:deal', function(data) {
      Table.find({'_id': socket.table}, function(err, doc) {
        if (err) {
          return;
        }
        var table = doc[0];
        console.log(table.shoe.length);
        // deal 2 cards to each connected player
        _.each(table.players, function(elm, index) {
          if (!elm.cards) {
            elm.cards = [];
          }
          // Deal 2 cards
          dealCards(table, elm, 2);
        });
        console.log(table.shoe.length);
        table.save();
      });
    });

    socket.on('table:getCard', function(data) {
      Table.find({'_id': socket.table}, function(err, doc) {
        if (err) {
          // TODO handle error properly
          return;
        }
        table = doc[0];
        var card = table.shoe.shift();

        console.log(card);
        socket.emit('table:newCard', {
          card: card
        });

        table.save();
      });
    });
  });
};
