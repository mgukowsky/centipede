(function () {
  if (typeof Centipede === "undefined") {
    window.Centipede = {};
  }

  var GameView = Centipede.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.keysdown = {};
    this.timerId = null;
  };

  GameView.prototype.setupKeys = function () {
    $("button").on("click", function(event) {
      if ($(event.target).hasClass("clicked")) {
        $(event.target).html("Click to PAUSE");
      } else {
        $(event.target).html("Click to RESUME");
      }
      $(event.target).toggleClass("clicked");
      window.PAUSED = !window.PAUSED;
    });
    
    $(document).on("keydown", function(event) {
    	event.preventDefault();
  		this.keysdown[event.keyCode] = true;
  	}.bind(this));
  	
  	$(document).on("keyup", function(event) {
  		this.keysdown[event.keyCode] = false;
  	}.bind(this));
  };
 

  GameView.prototype.winCheck = function () {
   
  };

  // GameView.prototype.gameEnd = function () {
    // $("section.lives").html(window.LIVES);
    // $("button").addClass("restart").html("click to RESTART")
    // $("button").off(); $("canvas").off(); $("body").off;
    // $("button").on("click", function () {
      // $("button").removeClass("restart");
      // this.game = new Centipede.Game();
      // _(2).times(function(){this.game.addCentipede()}.bind(this));
      // this.game.setupCells();
      // this.setupKeys();
      // window.SCORE = 0;
      // window.LIVES = 3;
    // }.bind(this))
    // this.ctx.font="50px Georgia";
    // this.ctx.fillText("Game Over!",50,100);
  // };
  
  GameView.prototype.loadImages = function () {
  	var shooter = new Image();
  	shooter.src = "./assets/shooter.gif";
  	var bullet = new Image();
  	bullet.src = "./assets/bullet.gif";
  	var centipedeHead = new Image();
  	centipedeHead.src = "./assets/centipede_head.gif";
  	var centipedeBody = new Image();
  	centipedeBody.src = "./assets/centipede_body.gif";
  	return {
  		shooter: shooter,
  		bullet: bullet,
  		centipedeHead: centipedeHead,
  		centipedeBody: centipedeBody
  	};
  };

  GameView.prototype.start = function () {
    var gameView = this;
    var images = this.loadImages();
    window.SCORE = 0;
    window.LIVES = 3;
    window.LEVEL = 1;
    window.CLEARED = 0;
    window.PAUSED = true;
    this.timerId = setInterval(
      function () {
        if (window.PAUSED) {
          return null;
        }
        else if (this.winCheck() === true) {
          this.gameEnd();
        } else {
          $("section.score").html(window.SCORE);
          $("section.lives").html(window.LIVES);
          $("section.level").html(window.LEVEL);
          $("section.cleared").html(window.CLEARED + "%");
          gameView.game.step(this.keysdown);
          gameView.game.draw(gameView.ctx, images);
        }
      }.bind(this), 1000 / (Centipede.Game.FPS * window.frameRateMod)
    );

    this.setupKeys();
  };
})();
