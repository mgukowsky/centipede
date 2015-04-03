(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Bullet = Centipede.Bullet = function (options) {
		this.x = options.x;
		this.y = options.y;
		this.vel = 20  / window.frameRateMod;	// Bullets travel in a straight line, so only 1D vector is needed.
		this.hitbox = new Centipede.Hitbox({
			width: 6,
			height: 4, // Bullet needs to hit head on; no collision with trail
			origin: [this.x, this.y]
		});
		// Centipede.Debugger.hitboxes.push(this.hitbox);
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
})();
