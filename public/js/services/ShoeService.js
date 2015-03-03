angular.module('ShoeService', [])
.factory('Shoe', function() {

  // --
  // constants
  var CARD_NAMES = ['Ace',2,3,4,5,6,7,8,9,10,'Jack','Queen','King'];
  var CARD_SUITS = ['Hearts','Diamonds','Spades','Clubs'];
  // --

  var deck = [];

  var buildDeck = function(names, suits) {
    var deck = [];
    for (var s = 0; s < suits.length; s++) {
      for (var n = 0; n < names.length; n++) {
        deck.push({
          name: names[n],
          suit: suits[s]
        });
      }
    }
    return deck;
  };

  return {
    newDeck: function() {
      return _.shuffle(buildDeck(CARD_NAMES, CARD_SUITS));
    }
  };
});
