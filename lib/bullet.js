(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Bullet = Centipede.Bullet = function (options) {
		this.x = options.x;
		this.y = 550;
		this.vel = 10;	// Bullets travel in a straight line, so only 1D vector is needed.
		this.hitbox = new Centipede.Hitbox({
			width: 6,
			height: 4, // Bullet needs to hit head on; no collision with trail
			origin: [this.x, 550]
		});
	};
	
	Bullet.prototype.isAtEndOfBoard = function (options) {
		if (this.y <= -10) {
			return true;
		} else {
			return false;
		}
	};
	
	Bullet.prototype.move = function () {
		this.y -= this.vel;
	};
})();
