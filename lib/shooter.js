(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Shooter = Centipede.Shooter = function (options) {
		this.x = 225;
		this.y = 560;
		this.vel = (10 / window.frameRateMod);
		this.MIN_X = 1;
		this.MIN_Y = 461;
		this.MAX_X = 439;
		this.MAX_Y = 579;
		this.context = options.context;
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, 560]
		});
		// Centipede.Debugger.hitboxes.push(this.hitbox);
		Centipede.Debugger.hitboxes.shooter = this.hitbox;
	};
	
	//Keycode constants
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	
	Shooter.prototype.move = function(options) {
		if (options[LEFT] && this.x > this.MIN_X && !this.willCollideWithMushroom([this.x - this.vel, this.y])) {
			this.x -= this.vel;
			this.hitbox.origin[0] -= this.vel;
		};
		//Neutralize if L & R are pressed
		if (options[RIGHT] && this.x < this.MAX_X && !this.willCollideWithMushroom([this.x + this.vel, this.y])) {
			this.x += this.vel;
			this.hitbox.origin[0] += this.vel;
		};
		if (options[UP] && this.y > this.MIN_Y && !this.willCollideWithMushroom([this.x, this.y - this.vel])) {
			this.y -= this.vel;
			this.hitbox.origin[1] -= this.vel;
		};
		//Neutralize if U & D are pressed
		if (options[DOWN] && this.y < this.MAX_Y && !this.willCollideWithMushroom([this.x, this.y + this.vel])) {
			this.y += this.vel;
			this.hitbox.origin[1] += this.vel;
		};
	};
	
	Shooter.prototype.willCollideWithMushroom = function (pos) {
		var hitbox = Centipede.Debugger.hitboxes["test"] = new Centipede.Hitbox({width: 20, height: 20, origin: pos});
		var willCollide = Centipede.collisionChecks.shooterWithMushroom(hitbox, this.context.shooterCollisionMushrooms, this.context);
		delete Centipede.Debugger.hitboxes["test"];
		return willCollide;
	};
})();
