(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	//Utilities and other goodies
	
	var Debugger = Centipede.Debugger = {
		hitboxes: {centipedes: {}, mushrooms: {}},
		showHitboxes: true
	};
	
	Debugger.drawHitboxes = function(ctx) {
		for (key in Centipede.Debugger.hitboxes) {
			if (key === "centipedes" || key === "mushrooms") {
				for (subKey in Centipede.Debugger.hitboxes[key]) {
					var segment = Centipede.Debugger.hitboxes[key];
					var hitbox = segment[subKey];
					ctx.strokeStyle = "#0000FF";
					ctx.strokeRect(hitbox.origin[0], hitbox.origin[1], hitbox.width, hitbox.height);
				}
			} else {
				var hitbox = Centipede.Debugger.hitboxes[key];
				ctx.strokeStyle = "#0000FF";
				ctx.strokeRect(hitbox.origin[0], hitbox.origin[1], hitbox.width, hitbox.height);
			}
		}
	};
})();
