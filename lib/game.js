(function () {
  if (typeof Centipede === "undefined") {
    window.Centipede = {};
  }


  var Game = Centipede.Game = function () {
  	this.difficulty = 0;
    this.shooter = new Centipede.Shooter({context: this});
    this.centipedes = this.setupCentipedes(this.difficulty);
    //Only need to mushrooms w/ Y origin >= 440 for collision w/ shooter
    this.shooterCollisionMushrooms = {};
    this.mushrooms = Centipede.Mushroom.seedMushrooms(this);
    this.explosions = {};
    this.bullet = null;
    this.shooterTimeout = -1;
  };

	Game.prototype.setupCentipedes = function (options) {
		var centipedes = {1: new Centipede.Centipedes({
				id: 1,
				isHead: true,
				x: -20,
				y: 0,
				difficulty: this.difficulty
			})
		};
		for (var i = 2; i <= 15; i++) {
			centipedes[i] = new Centipede.Centipedes({
				id: i,
				isHead: false,
				x: (-20 * i),
				y: 0,
				difficulty: this.difficulty
			});
		};
		for (var i = 16; i < 16 + (window.LEVEL - 1); i++) { // Add additional heads depending on level
			centipedes[i] = new Centipede.Centipedes({
				id: i,
				isHead: true,
				x: ((-20 * i) - (20 * (i - 16)) - 20),
				y: 0,
				difficulty: this.difficulty
			});
		};
		return centipedes;
	};

  Game.BG_COLOR = "#000";
  Game.DIM_X = 460;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.step = function (keysdown, context) {
    this.moveObjects(keysdown);
    if (this.isLevelCleared()) {
    	this.handleLevelClear(context);
    	return null;
    }
    this.checkForFleaAndSpiderCreation();
    this.handleFlea();
    this.handleSpider();
    if (this.shooter) {
    	this.handleShooterDestroy();
    }
    if (this.bullet) {
    	this.handleCentipedeDestroy();
    	this.handleMushroomDestroy();
    }
    this.handleBullet(keysdown);
    Centipede.collisionChecks.centipedesWithMushrooms(this.centipedes, this.mushrooms);
    this.checkForNewShooterCreation();
  };

  Game.prototype.isLevelCleared = function() { // Are there no centipedes left?
  	for (var id in this.centipedes) {
  		if (this.centipedes[id]) {
  			return false;
  		}
  	}
  	return true;
  };

  Game.prototype.handleLevelClear = function (context) {
  	if (!this.levelClearTimer) {
  		this.levelClearTimer = 1;
  		this.clearBoard();
  	} else if (this.levelClearTimer > 300) {
  		window.LEVEL += 1;
  		if (this.difficulty < 10) {
  			this.difficulty += 1;
  		}
  		delete Centipede.Debugger.hitboxes.shooter;
  		delete this.shooter;
  		this.levelClearTimer = null;
  		this.shooter = new Centipede.Shooter({context: this});
  		this.resetBoard();
  	} else {
  		++this.levelClearTimer;
  	}
  };

  Game.prototype.clearBoard = function () { // Assumes shooter has been destroyed
  	for (id in this.mushrooms) {
  		delete Centipede.Debugger.hitboxes.mushrooms[id];
  		delete this.mushrooms[id];
  	}
  	for (id in this.centipedes) {
  		delete Centipede.Debugger.hitboxes.centipedes[id];
  		delete this.mushrooms[id];
  	}
  	delete Centipede.Debugger.hitboxes.spider;
  	delete this.spider;
  	delete Centipede.Debugger.hitboxes.flea;
  	delete this.flea;
  	delete Centipede.Debugger.hitboxes.bullet;
  	delete this.bullet;
  	delete this.explosions;
  	delete this.shooterCollisionMushrooms;
  };

  Game.prototype.resetBoard = function () { // To be used when the shooter is either being recreated or must persist
    this.centipedes = this.setupCentipedes();
    this.shooterCollisionMushrooms = {};
  	this.mushrooms = Centipede.Mushroom.seedMushrooms(this);
    this.explosions = {};
    this.bullet = null;
  };

  Game.prototype.checkForNewShooterCreation = function () {
  	if (window.LIVES > 0) {
	  	if (this.shooterTimeout >= 120) {
	  		this.clearBoard();
	  		this.shooter = new Centipede.Shooter({context: this});
	  		this.resetBoard();
	  		this.shooterTimeout = -1;
	  	} else if (this.shooterTimeout < 120 && this.shooterTimeout >= 0) {
	  		this.shooterTimeout += 1;
	  	}
	  }
  };

  Game.prototype.handleShooterDestroy = function() {
  	if (Centipede.collisionChecks.shooterWithCentipede(this.centipedes, this.shooter, this) ||
  			(this.flea && Centipede.collisionChecks.shooterWithFlea(this.flea, this.shooter, this)) ||
  			(this.spider && Centipede.collisionChecks.shooterWithSpider(this.spider, this.shooter, this)) ) {
  		delete Centipede.Debugger.hitboxes.shooter;
  		delete this.shooter;
  		this.shooterTimeout = 0;
    }
  };

  Game.prototype.handleCentipedeDestroy = function() {
  	var shouldDestroyBullet = Centipede.collisionChecks.bulletWithCentipede(this.bullet, this.centipedes, this);
    if (shouldDestroyBullet) {
 			delete Centipede.Debugger.hitboxes.bullet; //Explicitly garbage collect bullet hitbox;
			delete this.bullet;
    }
  };

  Game.prototype.handleMushroomDestroy = function() {
  	var shouldDestroyBullet = Centipede.collisionChecks.bulletWithMushroom(this.bullet, this.mushrooms, this);
    if (shouldDestroyBullet) {
 			delete Centipede.Debugger.hitboxes.bullet; //Explicitly garbage collect bullet hitbox;
			delete this.bullet;
    }
  };

	Game.prototype.handleBullet = function(keysdown) {
		if (this.bullet && this.bullet.isAtEndOfBoard()) {
			delete Centipede.Debugger.hitboxes.bullet; //Explicitly garbage collect bullet hitbox;
			delete this.bullet;
		} else if (!this.bullet && keysdown[32] && this.shooter) {
			this.bullet = new Centipede.Bullet({
				x: this.shooter.x + 7,
				y: this.shooter.y
			});
		}
	};

	Game.prototype.handleFlea = function() {
		if (this.flea && this.flea.isAtEndOfBoard()) {
			delete Centipede.Debugger.hitboxes.flea;
			delete this.flea;
		} else if (this.flea && this.bullet && this.bullet.isCollidedWithObject(this.flea)) {
			this.explosions["flea"] = new Centipede.Explosion(this.flea);
			delete Centipede.Debugger.hitboxes.bullet;
			delete this.bullet;
			delete Centipede.Debugger.hitboxes.flea;
			delete this.flea;
			Centipede.Utils.updateScore(200);
		}
	};

	Game.prototype.handleSpider = function() {
		if (this.spider && this.spider.isAtEndOfBoard()) {
			delete Centipede.Debugger.hitboxes.spider;
			delete this.spider;
		} else if (this.spider && this.bullet && this.bullet.isCollidedWithObject(this.spider)) {
			this.explosions["spider"] = new Centipede.Explosion(this.spider);
			delete Centipede.Debugger.hitboxes.bullet;
			delete this.bullet;
			delete Centipede.Debugger.hitboxes.spider;
			delete this.spider;
			Centipede.Utils.updateScore(150);
		}
		this.handleSpiderWithMushroom();
	};

	Game.prototype.handleSpiderWithMushroom = function() {
  	if (this.spider) {
	    for (var mushId in this.mushrooms) {
	    	var mushroom = this.mushrooms[mushId];
	    	if (this.spider.isCollidedWithObject(mushroom)) {
	    		this.explosions[mushId + 100] = new Centipede.Explosion(mushroom);
	    		delete Centipede.Debugger.hitboxes.mushrooms[mushId];
	    		delete this.mushrooms[mushId];
	    		if (this.shooterCollisionMushrooms[mushId]){
						delete this.shooterCollisionMushrooms[mushId];
					};
	    		break;
	    	}
	    }
	  }
  };


  Game.prototype.moveObjects = function (keysdown) {
  	if (this.shooter) {
    	this.shooter.move(keysdown);
    }
    if (this.flea) {
    	this.flea.checkIfCanLayMush(this.centipedes); // Ensure that the flea does not lay a mushroom on a centipede
    	this.flea.move();
    	var mush = this.flea.layMushroom();
    	if (mush) {
    		this.mushrooms[mush.id] = mush;
    	}
    }
    if (this.spider) {
    	this.spider.move();
    }
    if (this.bullet) {
   	 this.bullet.move();
    };
    for (var centipede in this.centipedes) {
   		this.centipedes[centipede].checkAndMove();
    }
  };

  Game.prototype.draw = function (ctx, images, context) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    //boundary for the player's minimum y movement
    ctx.beginPath();
    ctx.moveTo(0, 460);
    ctx.lineTo(460, 460);
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();

    if (this.shooter) {
    	ctx.drawImage(images.shooter, this.shooter.x, this.shooter.y);
    }
    if (this.levelClearTimer) {
    	context.levelEnd();
    	return null;
    }
    if (this.bullet){
    	ctx.drawImage(images.bullet, this.bullet.x, this.bullet.y);
		};
		for (var centipede in this.centipedes) {
			this.drawCentipede(centipede, images, ctx);
		};
		for (var mushroom in this.mushrooms) {
			this.drawMushroom(mushroom, images, ctx);
		};
		for (var explosion in this.explosions) {
			this.drawExplosion(explosion, images, ctx);
		}
		if (this.flea) {
			this.drawFlea(images, ctx);
		}
		if (this.spider) {
			this.drawSpider(images, ctx);
		}
		if (Centipede.Debugger.showHitboxes) {
			Centipede.Debugger.drawHitboxes(ctx);
		};
  };

  Game.prototype.drawCentipede = function(centipede, images, ctx) {
  	var segment = this.centipedes[centipede];
		if (segment.isHead) {
			ctx.drawImage(images.centipedeHead, segment.x, segment.y);
		} else {
			ctx.drawImage(images.centipedeBody, segment.x, segment.y);
		};
  };

   Game.prototype.drawMushroom = function(mushroom, images, ctx) {
  	var mush = this.mushrooms[mushroom];
		if (mush.health === 4) {
			ctx.drawImage(images.fullMushroom, mush.x, mush.y);
		} else if (mush.health === 3) {
			ctx.drawImage(images.threeQuarterMushroom, mush.x, mush.y);
		} else if (mush.health === 2) {
			ctx.drawImage(images.halfMushroom, mush.x, mush.y);
		} else if (mush.health === 1) {
			ctx.drawImage(images.quarterMushroom, mush.x, mush.y);
		}
  };

  Game.prototype.drawExplosion = function(id, images, ctx) {
  	var explosion = this.explosions[id];
		if (window.MASTER_TIMER - explosion.timeStamp < 7) {
			ctx.drawImage(images.explosion1, explosion.x, explosion.y);
			return null;
		} else if (window.MASTER_TIMER - explosion.timeStamp < 15) {
			ctx.drawImage(images.explosion2, explosion.x, explosion.y);
			return null;
		} else if (window.MASTER_TIMER - explosion.timeStamp < 22) {
			ctx.drawImage(images.explosion3, explosion.x, explosion.y);
			return null;
		} else if (window.MASTER_TIMER - explosion.timeStamp < 30) {
			ctx.drawImage(images.explosion4, explosion.x, explosion.y);
			return null;
		} else {
			delete this.explosions[id];
		}
  };

  Game.prototype.drawFlea = function(images, ctx) {
  	ctx.drawImage(images.flea, this.flea.x, this.flea.y);
  };

  Game.prototype.drawSpider = function(images, ctx) {
  	ctx.drawImage(images.spider, this.spider.x, this.spider.y);
  };

  Game.prototype.checkForFleaAndSpiderCreation = function () {
  	if (!this.flea && window.MASTER_TIMER > 0 && window.MASTER_TIMER % 240 === 0) {
  		var num = Math.random();
  		if (num > 0.5) {
  			this.flea = new Centipede.Flea(this, {difficulty: this.difficulty});
  		}
  	}
  	if (!this.spider && window.MASTER_TIMER > 0 && window.MASTER_TIMER % 120 === 0) {
  		var num = Math.random();
  		if (num > 0.5) {
  			this.spider = new Centipede.Spider(this, {difficulty: this.difficulty});
  		}
  	}
  };

})();
