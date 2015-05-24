(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};

	var collisionChecks = Centipede.collisionChecks = {};

	var updateCentipedeHead = function(id, centipedes, context) {
		var newX = centipedes[id].x;
		var newY = centipedes[id].y;
		context.explosions[id] = new Centipede.Explosion(centipedes[id]);
		delete Centipede.Debugger.hitboxes.centipedes[id];
		delete centipedes[id];
		context.mushrooms[window.mushroomIndex] = Centipede.Mushroom.generateMushroom(window.mushroomIndex,
																																									newX,
																																									newY,
																																									context);
		window.mushroomIndex += 1;
		if (centipedes[(id * 1) + 1]) {
			centipedes[(id * 1) + 1].isHead = true;
		};
	};

	var destroyMushroom = function(id, mushrooms, context) {
		context.explosions[id] = new Centipede.Explosion(mushrooms[id]);
		delete Centipede.Debugger.hitboxes.mushrooms[id];
		delete mushrooms[id];
		if (context.shooterCollisionMushrooms[id]){
			delete context.shooterCollisionMushrooms[id];
		};
	};

	collisionChecks.bulletWithCentipede = function (bullet, centipedes, context) {
		var shouldDestroyBullet = false;
		for (var id in centipedes) {
			var centipede = centipedes[id];
			if (centipede.hitbox.isCollidedWith(bullet.hitbox)) {
				shouldDestroyBullet = true;
				if (centipede.isHead) {
					Centipede.Utils.updateScore(100);
				} else {
					Centipede.Utils.updateScore(10);
				}
				updateCentipedeHead(id, centipedes, context);
			}
		};
		return shouldDestroyBullet;
	};

	collisionChecks.bulletWithMushroom = function (bullet, mushrooms, context) {
		var shouldDestroyBullet = false;
		for (var id in mushrooms) {
			if (!bullet) { //Bullet will be destroyed during collision with centipede, which occurs first.
				continue;
			}
			var mushroom = mushrooms[id];
			if (mushroom.hitbox.isCollidedWith(bullet.hitbox)) {
				shouldDestroyBullet = true;
				if (mushroom.takeDamageAndDestroyCheck()) {
					destroyMushroom(id, mushrooms, context);
					Centipede.Utils.updateScore(1);
				}
			}
		};
		return shouldDestroyBullet;
	};

	collisionChecks.centipedesWithMushrooms = function(centipedes, mushrooms) {
		for (var id in centipedes) {
			var centipede = centipedes[id];
			collisionChecks.centipedeWithMushroom(centipede, mushrooms);
		};
	};

	collisionChecks.centipedeWithMushroom = function(centipede, mushrooms) {
		for (var id in mushrooms) {
			var mushroom = mushrooms[id];
			if (mushroom.hitbox.isCollidedWith(centipede.hitbox)) {
				centipede.vel[0] *= -1;
				centipede.x = Centipede.Utils.coerceToMultipleOfTwenty(centipede.x);
				centipede.y += centipede.vel[1];
			}
		};
	};

	collisionChecks.shooterWithCentipede = function(centipedes, shooter, context) {
		var shouldDestroyShooter = false;
		for (var id in centipedes) {
			var centipede = centipedes[id];
			if (shooter.hitbox.isCollidedWith(centipede.hitbox)) {
				Centipede.Utils.updateLives();
				context.explosions[id] = new Centipede.Explosion(shooter);
				shouldDestroyShooter = true;
				break;
			}
		}
		return shouldDestroyShooter;
	};


	collisionChecks.shooterWithMushroom = function (hitbox, mushrooms, context) {
		var isCollided = false;
		for (var id in mushrooms) {
			var mushroom = mushrooms[id];
			if (hitbox.isCollidedWith(mushroom.hitbox)) {
				isCollided = true;
				break;
			}
		}
		return isCollided;
	};

	collisionChecks.shooterWithFlea = function (flea, shooter, context) {
		var isCollided = false;
		if (flea.isCollidedWithObject(shooter)) {
			Centipede.Utils.updateLives();
			context.explosions["shooter"] = new Centipede.Explosion(shooter);
			isCollided = true;
		}
		return isCollided;
	};

	collisionChecks.shooterWithSpider = function (spider, shooter, context) {
		var isCollided = false;
		if (spider.isCollidedWithObject(shooter)) {
			Centipede.Utils.updateLives();
			context.explosions["shooter"] = new Centipede.Explosion(shooter);
			isCollided = true;
		}
		return isCollided;
	};
})();
