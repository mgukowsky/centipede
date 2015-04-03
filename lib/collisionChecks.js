(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var collisionChecks = Centipede.collisionChecks = {};
	
	var updateCentipedeHead = function(id, centipedes, context) {
		var newX = centipedes[id].x;
		var newY = centipedes[id].y;
		delete Centipede.Debugger.hitboxes.centipedes[id];
		delete centipedes[id];
		context.mushrooms[window.mushroomIndex] = Centipede.Mushroom.generateMushroom(window.mushroomIndex, newX, newY);
		window.mushroomIndex += 1;
		//TODO: Make new mushroom at old head position
		if (centipedes[(id * 1) + 1]) {
			centipedes[(id * 1) + 1].isHead = true;
		};
	};
	
	var destroyMushroom = function(id, mushrooms) {
		delete Centipede.Debugger.hitboxes.mushrooms[id];
		delete mushrooms[id];
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
	
	collisionChecks.bulletWithMushroom = function (bullet, mushrooms) {
		var shouldDestroyBullet = false;
		for (var id in mushrooms) {
			if (!bullet) {
				continue;
			}
			var mushroom = mushrooms[id];
			if (mushroom.hitbox.isCollidedWith(bullet.hitbox)) {
				shouldDestroyBullet = true;
				if (mushroom.takeDamageAndDestroyCheck()) {
					destroyMushroom(id, mushrooms);
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
				centipede.x += centipede.vel[0];
				centipede.y += centipede.vel[1];
				return null;
			}
		};
	};
	
})();
