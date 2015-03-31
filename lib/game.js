(function () {
  if (typeof Centipede === "undefined") {
    window.Centipede = {};
  }


  var Game = Centipede.Game = function () {
   this.shooter = new Centipede.Shooter();
   this.bullet = null;
  };

  Game.BG_COLOR = "#000";
  Game.DIM_X = 450;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.step = function (keysdown) {
    this.moveObjects(keysdown);
    this.handleBullet(keysdown);
  };

	Game.prototype.handleBullet = function(keysdown) {
		if (this.bullet && this.bullet.isAtEndOfBoard()) {
			this.bullet = null;
		} else if (!this.bullet && keysdown[32]) {
			this.bullet = new Centipede.Bullet({
				x: this.shooter.x + 21
			});
		}
	};
	
  Game.prototype.moveObjects = function (keysdown) {
   this.shooter.move(keysdown);
   if (this.bullet) {
   	this.bullet.move();
   }
  };
  
  Game.prototype.draw = function (ctx, images) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    ctx.beginPath();
    ctx.moveTo(0, 550);
    ctx.lineTo(450, 550);
    ctx.stroke();
    ctx.drawImage(images.shooter, this.shooter.x, 560);
    if (this.bullet){
    	ctx.drawImage(images.bullet, this.bullet.x, this.bullet.y);
		};
		if (Centipede.Debugger.showHitboxes) {
			Centipede.Debugger.drawHitboxes(ctx);
		};
  };
})();
