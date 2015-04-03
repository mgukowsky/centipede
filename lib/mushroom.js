(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Mushroom = Centipede.Mushroom = function (options) {
		this.id = options.id;
		this.health = 4;
		this.x = options.x;
		if (options.y > 560) {
			options.y += 20;
		};
		this.y = options.y;
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, this.y]
		});
		Centipede.Debugger.hitboxes.mushrooms[this.id] = this.hitbox;
	};
	
	Mushroom.seedMushrooms = function(options) { //"class method"
	var mushCollection = {};
		_(30).times(function(n) {
			mushCollection[n] = new Centipede.Mushroom({
				id: n,
				x: Centipede.Utils.getRandomMultipleOfTwenty() % 450,
				y: Centipede.Utils.getRandomMultipleOfTwenty() % 600
			});
		});
		return mushCollection;
  };
	
	Mushroom.prototype.takeDamageAndDestroyCheck = function () {
		this.health -= 1;
		if (this.health === 0) {
			return true;
		} else {
			return false;
		}
	};
	
})();
