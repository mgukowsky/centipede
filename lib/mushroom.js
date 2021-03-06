(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Mushroom = Centipede.Mushroom = function (options, context) {
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
		if (this.y >= 440) {
			context.shooterCollisionMushrooms[this.id] = this;
		}
	};
	
	Mushroom.seedMushrooms = function(context) {
	var mushCollection = {};
		_(10).times(function(n) {
			var x, y, tmphitbox;
			//prevent mushroom from spawning on top of shooter
			while (true) {
				x = Centipede.Utils.getRandomMultipleOfTwenty() % 440;
				y = Centipede.Utils.getRandomMultipleOfTwenty() % 600;
				tmphitbox = new Centipede.Hitbox({width: 20, height: 20, origin: [x, y]});
				if (!tmphitbox.isCollidedWith(context.shooter.hitbox)){
					break;
				};
			};
			var newMush = mushCollection[n] = new Centipede.Mushroom({
				id: n,
				x: Centipede.Utils.getRandomMultipleOfTwenty() % 440,
				y: Centipede.Utils.getRandomMultipleOfTwenty() % 600,
			}, context);
			if (newMush.y >= 440) {
			context.shooterCollisionMushrooms[newMush.id] = newMush;
		}
		});
		return mushCollection;
  };
  
  Mushroom.generateMushroom = function(id, x, y, context) {
  	return new Centipede.Mushroom({
  		id: id, 
  		x: x,
  		y: y, 
  	}, context);
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
