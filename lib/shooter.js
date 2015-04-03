(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Shooter = Centipede.Shooter = function (options) {
		this.x = 225;
		this.y = 560;
		this.vel = (10 / window.frameRateMod);
		this.MIN_X = 1;
		this.MIN_Y = 501;
		this.MAX_X = 429;
		this.MAX_Y = 579;
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, 560]
		});
		// Centipede.Debugger.hitboxes.push(this.hitbox);
		Centipede.Debugger.hitboxes.shooter = this.hitbox;
	};
	
	Shooter.prototype.move = function(options) {
		if (options[37] && this.x > this.MIN_X) {
			this.x -= this.vel;
			this.hitbox.origin[0] -= this.vel;
		};
		//Neutralize if L & R are pressed
		if (options[39] && this.x < this.MAX_X) {
			this.x += this.vel;
			this.hitbox.origin[0] += this.vel;
		};
		if (options[38] && this.y > this.MIN_Y) {
			this.y -= this.vel;
			this.hitbox.origin[1] -= this.vel;
		};
		//Neutralize if U & D are pressed
		if (options[40] && this.y < this.MAX_Y) {
			this.y += this.vel;
			this.hitbox.origin[1] += this.vel;
		};
	};
})();
