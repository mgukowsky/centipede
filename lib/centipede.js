(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Centipedes = Centipede.Centipedes = function (options) {
		this.id = options.id;
		this.isHead = options.isHead;
		this.x = options.x;
		this.y = options.y;
		this.vel = [(10 / window.frameRateMod) + options.difficulty, 20];
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, this.y]
		});
		Centipede.Debugger.hitboxes.centipedes[this.id] = this.hitbox;
	};
	
	Centipedes.prototype.move = function () {
		this.x += this.vel[0];
		this.hitbox.origin = [this.x, this.y];
	};
	
	Centipedes.prototype.checkAndMove = function () { //Swap direction if at edge
		if ((this.x >= 440 && this.vel[0] > 0) || (this.x <= 0 && this.vel[0] < 0)) {
			this.vel[0] *= -1;
			this.y += this.vel[1];
		} else if (this.vel[1] > 0 && this.y >= 580) {
				this.vel[1] *= -1;
		} else if (this.vel[1] < 0 && this.y <= 460) {
				this.vel[1] *= -1;
		};
		this.move();
	};
})();
