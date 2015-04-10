(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Spider = Centipede.Spider = function (context, options) {
		var newX = Math.random();
		this.x = (newX > 0.5) ? 0 : 440;
		//this.x = (Math.random() > 0.5) ? 0 : 440;
		this.y = Centipede.Utils.getRandomMultipleOfTwenty() % 600;
		this.vel = [(4  / window.frameRateMod) + options.difficulty,
								 (4  / window.frameRateMod) + options.difficulty];
		if (this.x === 440) {this.vel[0] *= -1;}; // Spider can go E or W 
		this.tempVel = [];
		this.timer = 0;
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, this.y]
		});
		// Centipede.Debugger.hitboxes.push(this.hitbox);
		Centipede.Debugger.hitboxes.spider = this.hitbox;
		this.context = context;
	};
	
	Spider.prototype.isAtEndOfBoard = function (options) {
		if (this.y >= 600 || this.y <= -20 || this.x <= -20 || this.x >= 460) {
			return true;
		} else {
			return false;
		}
	};
	
	// Spider alternates between moving and static every 2 seconds
	Spider.prototype.move = function () {
		if (this.timer === 0) {
			this.tempVel = this.getVelVector();
		}
		if (this.timer <= 30) {
			this.x += this.tempVel[0];
			this.hitbox.origin[0] += this.tempVel[0];
			this.y += this.tempVel[1];
			this.hitbox.origin[1] += this.tempVel[1];
		}
		(this.timer > 60) ? this.timer = 0 : ++this.timer;
	};
	
	// Spider moves diagonally or U/D
	Spider.prototype.getVelVector = function () {
		var x = (Math.random() > 0.5) ? this.vel[0] : 0;
		var y = (Math.random() > 0.5) ? this.vel[1] : this.vel[1] * -1;
		return [x, y];
	};
	
	Spider.prototype.isCollidedWithObject = function (object) {
		if (object.hitbox.isCollidedWith(this.hitbox)) {
			return true;
		} else {
			return false;
		}
	};
})();
