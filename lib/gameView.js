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
    $("button.pause").on("click", function(event) {
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
  	
  	$("#transitions-on").on("click", function(){window.options.runTransitions = true;});
  	$("#transitions-off").on("click", function(){window.options.runTransitions = false;});

  };
  
  GameView.prototype.setupAnimations = function() {
  	$("#score").on("transitionend", function(event) {
  		$(event.currentTarget).css({"border": "1px solid black",
  																"color": "white",
  																"background-color": "green"});
  	});
  	$("#lives").on("transitionend", function(event) {
  		$(event.currentTarget).css({"left": "150px",
  																"border": "1px solid black",
  																"color": "white",
  																"font-size": "20px",
  																"height": "50px",
  																"width": "100px",
  																"background-color": "red"});
  		$("div.content").css({"background-color": "#fff"});
  	});
  	$("#score-flash").on("transitionend", function(event) {
  		$(event.currentTarget).css({"opacity": "0",
  																"top": "320px"});
  	});
  };
  
  GameView.prototype.setupListeners = function(){
  	var arrows = $("#item-info");
  	$("button.pause").on("click", function(){
  		arrows.toggleClass("invisible");
  	});
  	var modal = $(".modal-screen");
  	var doc = $("body");
  	var info = $(".how-to-play-info");
  	$(".how-to-play-link").on("click", function(event){
  		modal.toggleClass("off");
  		console.log("here");
  		event.preventDefault();
  		doc.prepend(modal);
  		info.css({"left": "300px"});
  	});
  	$("button.close-dialog").on("click", function(){
  		info.css({"left": "-1000px"});
  		modal.toggleClass("off");
  	});
  };

  GameView.prototype.gameEnd = function () {
     this.ctx.font="100px Francois One";
     this.ctx.fillStyle = "#C00";
     this.ctx.fillText("GAME", 100, 200);
     this.ctx.fillText("OVER :(", 75, 350);
  };
  
  GameView.prototype.levelEnd = function () {
  	this.ctx.font="80px Francois One";
  	this.ctx.fillStyle = "#0C0";
    this.ctx.fillText("LEVEL", 125, 100);
    this.ctx.fillText(window.LEVEL, 200, 200);
    this.ctx.fillText("COMPLETE!", 50, 300);
  };
  
  GameView.prototype.loadImages = function () {
  	var shooter = new Image();
  	shooter.src = "./assets/shooter.gif";
  	var bullet = new Image();
  	bullet.src = "./assets/bullet.gif";
  	var centipedeHead = new Image();
  	centipedeHead.src = "./assets/centipede_head.gif";
  	var centipedeBody = new Image();
  	centipedeBody.src = "./assets/centipede_body.gif";
  	
  	var fullMushroom = new Image();
  	fullMushroom.src = "./assets/full_mushroom.gif";
  	var threeQuarterMushroom = new Image();
  	threeQuarterMushroom.src = "./assets/three_quarter_mushroom.gif";
  	var halfMushroom = new Image();
  	halfMushroom.src = "./assets/half_mushroom.gif";
  	var quarterMushroom = new Image();
  	quarterMushroom.src = "./assets/quarter_mushroom.gif";
  	
  	var explosion1 = new Image();
  	explosion1.src = "./assets/explosion1.gif";
  	var explosion2 = new Image();
  	explosion2.src = "./assets/explosion2.gif";
  	var explosion3 = new Image();
  	explosion3.src = "./assets/explosion3.gif";
  	var explosion4 = new Image();
  	explosion4.src = "./assets/explosion4.gif";
  	
  	var flea = new Image();
  	flea.src = "./assets/flea.gif";	
  	var spider = new Image();
  	spider.src = "./assets/spider.gif";
  	var scorpion = new Image();
  	scorpion.src = "./assets/scorpion.gif";
  	
  	return {
  		shooter: shooter,
  		bullet: bullet,
  		centipedeHead: centipedeHead,
  		centipedeBody: centipedeBody,
  		fullMushroom: fullMushroom,
  		threeQuarterMushroom: threeQuarterMushroom,
  		halfMushroom: halfMushroom,
  		quarterMushroom: quarterMushroom,
  		explosion1: explosion1,
  		explosion2: explosion2,
  		explosion3: explosion3,
  		explosion4: explosion4,
  		flea: flea,
  		spider: spider,
  		scorpion: scorpion
  	};
  };
  
  GameView.prototype.setupGlobals = function () {
  	window.SCORE = 0;
    window.LIVES = 3;
    window.LEVEL = 1;
    window.CLEARED = 0;
    window.PAUSED = true;
    window.MASTER_TIMER = 0;
    window.centipedeIndex = 16;
    window.mushroomIndex = 40;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    var images = this.loadImages();
    this.setupGlobals();
    this.timerId = setInterval(
      function () {
        if (window.PAUSED) {
          return null;
        } else {
          $("section.score").html(window.SCORE);
          $("section.lives").html(window.LIVES);
          $("section.level").html(window.LEVEL);
          $("section.cleared").html(window.CLEARED + "%");
          gameView.game.step(this.keysdown, this);
          gameView.game.draw(gameView.ctx, images, this);
          ++window.MASTER_TIMER; 
          if (window.LIVES === 0) {
          	this.gameEnd();
         };       
        }
      }.bind(this), 1000 / (Centipede.Game.FPS * window.frameRateMod)
    );
    this.setupKeys();
    this.setupAnimations();
    this.setupListeners();
  };
})();
