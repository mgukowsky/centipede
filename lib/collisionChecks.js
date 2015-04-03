(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var collisionChecks = Centipede.collisionChecks = {};
	
	var updateCentipedeHead = function(id, centipedes) {
		delete Centipede.Debugger.hitboxes.centipedes[id];
		delete centipedes[id];
		//TODO: Make new mushroom at old head position
		if (centipedes[(id * 1) + 1]) {
			centipedes[(id * 1) + 1].isHead = true;
		};
	};
	
	var destroyMushroom = function(id, mushrooms) {
		delete Centipede.Debugger.hitboxes.mushrooms[id];
		delete mushrooms[id];
	};
	
	collisionChecks.bulletWithCentipede = function (bullet, centipedes) {
		var shouldDestroyBullet = false;
		for (id in centipedes) {
			var centipede = centipedes[id];
			if (centipede.hitbox.isCollidedWith(bullet.hitbox)) {
				shouldDestroyBullet = true;
				if (centipede.isHead) {
					Centipede.Utils.updateScore(100);
				} else {
					Centipede.Utils.updateScore(10);
				}
				updateCentipedeHead(id, centipedes);
			}
		};
		return shouldDestroyBullet;
	};
	
	collisionChecks.bulletWithMushroom = function (bullet, mushrooms) {
		var shouldDestroyBullet = false;
		for (id in mushrooms) {
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
	
})();