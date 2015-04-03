(function () {
  if (typeof Centipede === "undefined") {
    window.Centipede = {};
  }


  var Game = Centipede.Game = function () {
   this.shooter = new Centipede.Shooter();
   this.centipedes = this.setupCentipedes();
   this.bullet = null;
  };
	
	Game.prototype.setupCentipedes = function (options) {
		var centipedes = {1: new Centipede.Centipedes({
				id: 1,
				isHead: true,
				x: -20,
				y: 0
			})
		};
		for (var i = 2; i <= 15; i++) {
			centipedes[i] = new Centipede.Centipedes({
				id: i,
				isHead: false,
				x: (-20 * i),
				y: 0
			});
		};
		return centipedes;
	};
	
  Game.BG_COLOR = "#000";
  Game.DIM_X = 450;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.step = function (keysdown) {
    this.moveObjects(keysdown);
    if (this.bullet) {
    	this.handleCentipedeDestroy();
    }
    this.handleBullet(keysdown);
  };
  
  Game.prototype.handleCentipedeDestroy = function() {
  	var shouldDestroyBullet = Centipede.collisionChecks.bulletWithCentipede(this.bullet, this.centipedes);
    if (shouldDestroyBullet) {
 			delete Centipede.Debugger.hitboxes.bullet; //Explicitly garbage collect bullet hitbox;
			delete this.bullet;
    }
  };

	Game.prototype.handleBullet = function(keysdown) {
		if (this.bullet && this.bullet.isAtEndOfBoard()) {
			delete Centipede.Debugger.hitboxes.bullet; //Explicitly garbage collect bullet hitbox;
			delete this.bullet;
		} else if (!this.bullet && keysdown[32]) {
			this.bullet = new Centipede.Bullet({
				x: this.shooter.x + 7,
				y: this.shooter.y
			});
		}
	};
	
  Game.prototype.moveObjects = function (keysdown) {
    this.shooter.move(keysdown);
    if (this.bullet) {
   	 this.bullet.move();
    };
    for (centipede in this.centipedes) {
   		this.centipedes[centipede].checkAndMove();
    }
  };
  
  Game.prototype.draw = function (ctx, images) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(450, 500);
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();
    ctx.drawImage(images.shooter, this.shooter.x, this.shooter.y);
    if (this.bullet){
    	ctx.drawImage(images.bullet, this.bullet.x, this.bullet.y);
		};
		for (centipede in this.centipedes) {
			var segment = this.centipedes[centipede];
			if (segment.isHead) {
				ctx.drawImage(images.centipedeHead, segment.x, segment.y);
			} else {
				ctx.drawImage(images.centipedeBody, segment.x, segment.y);
			}
		};
		if (Centipede.Debugger.showHitboxes) {
			Centipede.Debugger.drawHitboxes(ctx);
		};
  };
})();
