(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};

	var Flea = Centipede.Flea = function (context, options) {
		this.x = Centipede.Utils.getRandomMultipleOfTwenty() % 440;
		this.y = 0;
		this.vel = (8  / window.options.frameRateMod) + options.difficulty;	
		this.hitbox = new Centipede.Hitbox({
			width: 20,
			height: 20,
			origin: [this.x, this.y]
		});
		// Centipede.Debugger.hitboxes.push(this.hitbox);
		Centipede.Debugger.hitboxes.flea = this.hitbox;
		this.context = context;
	};

	Flea.prototype.isAtEndOfBoard = function (options) {
		if (this.y >= 600) {
			return true;
		} else {
			return false;
		}
	};

	Flea.prototype.move = function () {
		this.y += this.vel;
		this.hitbox.origin[1] += this.vel;
	};

	Flea.prototype.isCollidedWithObject = function (object) {
		if (object.hitbox.isCollidedWith(this.hitbox)) {
			return true;
		} else {
			return false;
		}
	};

	Flea.prototype.layMushroom = function() {
		if (this.canLayMush) {
			var num = Math.floor(Math.random() * 1000);
			if (num <= 50 && this.y <= 560) {
				var mush =  Centipede.Mushroom.generateMushroom(window.mushroomIndex,
																												this.x,
																												Centipede.Utils.coerceToMultipleOfTwenty(this.y),
																												this.context);
				window.mushroomIndex += 1;
				return mush;
			} else {
				return false;
			}
		}
	};

	Flea.prototype.checkIfCanLayMush = function(centipedes) {
		this.canLayMush = true;
		for (var id in centipedes) {
			var centipede = centipedes[id];
			if (this.isCollidedWithObject(centipede)) {
				this.canLayMush = false;
				break;
			}
		}
	};

})();
