(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};

	var Bullet = Centipede.Bullet = function (options) {
		this.x = options.x;
		this.y = options.y;
		this.vel = 40  / window.options.frameRateMod;	// Bullets travel in a straight line, so only 1D vector is needed.
		this.hitbox = new Centipede.Hitbox({
			width: 4,
			height: 10,
			origin: [this.x+2, this.y]
		});
		Centipede.Debugger.hitboxes.bullet = this.hitbox;
	};

	Bullet.prototype.isAtEndOfBoard = function (options) {
		if (this.y <= 0) {
			return true;
		} else {
			return false;
		}
	};

	Bullet.prototype.move = function () {
		this.y -= this.vel;
		this.hitbox.origin[1] -= this.vel;
	};

	Bullet.prototype.isCollidedWithObject = function (object) {
		if (object.hitbox.isCollidedWith(this.hitbox)) {
			return true;
		} else {
			return false;
		}
	};
})();
