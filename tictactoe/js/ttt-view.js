const Game = require("./game.js");
class View {
  constructor(game, $el) {
    this.game = game;
    this.container = $el;
    this.setupBoard();
    this.bindEvents();
  }


  bindEvents() {
    $('ul').on('click', 'li', (e) => {

      const $square = $(e.target);
    const pos = $square.attr('pos');
    console.log(pos);
     if (this.isMarked($square)){
       alert("Invalid Move!");
     } else{
       const posArray = [parseInt(pos[0]), parseInt(pos[2])];

       $square.text(this.game.currentPlayer.toUpperCase());
       $square.toggleClass("clicked");
       $square.toggleClass("unclicked");
       $square.attr("mark", this.game.currentPlayer);
       this.game.playMove(posArray);
      //  debugger
       if(this.game.isOver()) {
         if(this.game.winner()){
           this.game.swapTurn();
           this.gameOver(this.game.currentPlayer);
         } else {
           const drawText = $("<p>").text(`No Winner!`)
           $('ul').parent().append(drawText)
           $("li").addClass("losing")
         }
       }
     }
    });
  }
  gameOver(winningMark){
     $("li").filter((idx, el) => {
      //  debugger;
       if($(el).attr('mark') === winningMark) {
         $(el).addClass("winning");
       } else {
         $(el).addClass("losing")
       }
     });

     const winText = $("<p>").text(`You win, ${winningMark}!`).addClass("winText")
     $('ul').parent().append(winText)
  }

  isMarked($li){
    if($li.hasClass('clicked')){
      return true;
    } else{
      return false;
    }
  }

  makeMove($square) {}

  setupBoard() {
    const $ul = $("<ul>");
    this.container.append($ul);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const $li =  $("<li>");
        $li.attr("pos", [i, j]).addClass("unclicked");
         $ul.append($li);
      }
    }




  }
}

module.exports = View;
