angular.module('TableCtrl', [])
.controller('TableController', ['$scope', '$routeParams', 'socket', 'Table', function($scope, $routeParams, socket, Table) {

  $scope.username = '';
  $scope.cards = [];

  Table.join($routeParams.id);

  socket.on('table:console', function(data) {
    console.log(data);
  });

  socket.on('table:username', function(data) {
    $scope.username = data;
  });

  $scope.pickedCards = '';

  $scope.deal = function() {
    socket.emit('table:deal',{});
  }

  $scope.getCard = function() {
    socket.emit('table:getCard', {});
  };

  socket.on('table:newCard', function(data) {
    $scope.cards.push(data.cart);
    $scope.pickedCards = $scope.pickedCards + ' ' + data.card.name + data.card.suit;
  });

}]);
