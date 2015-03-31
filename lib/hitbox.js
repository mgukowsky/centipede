(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Hitbox = Centipede.Hitbox = function (options) {
		this.width = options.width;
		this.height = options.height;
		this.origin = options.origin;
	};	
	
	Hitbox.prototype.isCollidedWith = function (otherHitbox) {
		//Collision algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
		if (this.origin[0] < otherHitbox.origin[0] + otherHitbox.width &&
   		this.origin[0] + this.width > otherHitbox.origin[0] &&
   		this.origin[1] < otherHitbox.origin[1] + otherHitbox.height &&
   		this.origin[1] + this.height > otherHitbox.origin[1]) {
    		return true;
		} else {
			return false;
		};
	};
	
})();
