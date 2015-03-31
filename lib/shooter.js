(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Shooter = Centipede.Shooter = function (options) {
		this.x = 225;
		this.vel = 4;
		this.MIN_X = 10;
		this.MAX_X = 398;
		this.hitbox = new Centipede.Hitbox({
			width: 42,
			height: 30,
			origin: [this.x, 560]
		});
	};
	
	Shooter.prototype.move = function(options) {
		if (options[37] && this.x > this.MIN_X) {
			this.x -= this.vel;
			this.hitbox.origin[0] -= this.vel;
		};
		//Neutralize if L & R are pressed :)
		if (options[39] && this.x < this.MAX_X) {
			this.x += this.vel;
			this.hitbox.origin[0] += this.vel;
		};
	};
})();
