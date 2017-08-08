const View = require('./ttt-view.js');
const Game = require("./game.js");

$( () => {
  // Your code here
  const $container = $('figure');
  const game = new Game();
  const view = new View(game, $container);
});
