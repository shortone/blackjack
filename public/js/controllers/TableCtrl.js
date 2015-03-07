angular.module('TableCtrl', [])
.controller('TableController', ['$scope', '$routeParams', 'socket', 'User', 'Table', function($scope, $routeParams, socket, User, Table) {

  Table.init($routeParams.id).then(function() {
    $scope.username = User.getName();
    $scope.dealer = Table.getDealer();
    $scope.players = Table.getPlayers();

    $scope.$watch(function() {
      return Table.getPlayers();
    }, function(players) {
      $scope.players = players;
    });
  });

  $scope.isDealer = function() {
    return User.getRole() === Table.RoleEnum.DEALER;
  };

  $scope.isPlayer = function(spot) {
    return User.getName() === spot;
  };

  User.log();
  Table.log();

  socket.on('table:console', function(data) {
    console.log(data);
  });

  socket.on('table:username', function(data) {
    $scope.username = data;
  });

  $scope.pickedCards = '';

  $scope.deal = function() {
    Table.deal();
  };

  $scope.getCard = function() {
    socket.emit('table:getCard', {});
  };

  socket.on('table:newCard', function(data) {
    $scope.cards.push(data.cart);
    $scope.pickedCards = $scope.pickedCards + ' ' + data.card.name + data.card.suit;
  });

}]);
