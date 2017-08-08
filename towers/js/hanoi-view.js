class View {
  constructor(game, el) {
    this.game = game;
    this.$container = el;
    this.setupTower();
    this.bindEvents();
    this.movePos = [];
  }

  isGameOver() {
    if (this.game.isWon()) {
      alert("game over");
      $('li').addClass("winningGame");
      return true;
    }
    return false;
  }

  setupTower() {
    for (var i = 0; i < this.game.towers.length; i++) {
      const $tower = $("<ul>").attr("tower", i);
      this.$container.append($tower);
    }
    this.renderDisks();
  }

  destroyDisks() {
    $('ul').empty();
  }

  renderDisks() {
    // for (var j = this.game.towers[i].length - 1; j >= 0; j--) {
    this.destroyDisks();

    $("ul").each((idx, tower) => {
      const $tower = $(tower);
      const $towerIdx = idx;
      for (var i = this.game.towers[idx].length - 1; i >= 0; i--) {
        const $disk = $("<li>")
          .addClass(`disk${this.game.towers[idx][i]}`);
        $tower.append($disk);
      }
    });

  }



  bindEvents() {
    $('ul').on("click", (e) => {
      this.makeMove(e);
      this.isGameOver()
    });
  }
  makeMove(e) {
    const $tower = $(e.currentTarget)
    const pos = $tower.attr("tower");
    const moves = this.movePos;
    if (moves.length === 0) {
      $tower.addClass("selected");
      moves.push(parseInt(pos));

    } else {
      // debugger
      moves.push(parseInt(pos));
      this.game.move(moves[0], moves[1]);
      this.movePos = [];
      $('ul').removeClass('selected');
    }
    this.renderDisks();
  }
}





module.exports = View;
