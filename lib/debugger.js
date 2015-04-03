(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	//Utilities and other goodies
	
	var Debugger = Centipede.Debugger = {
		hitboxes: {},
		showHitboxes: true
	};
	
	Debugger.drawHitboxes = function(ctx) {
		// Centipede.Debugger.hitboxes.forEach(function(hitbox) {
			// ctx.strokeStyle = "#0000FF";
			// ctx.strokeRect(hitbox.origin[0], hitbox.origin[1], hitbox.width, hitbox.height);
		// });
		for (key in Centipede.Debugger.hitboxes) {
			var hitbox = Centipede.Debugger.hitboxes[key];
			ctx.strokeStyle = "#0000FF";
			ctx.strokeRect(hitbox.origin[0], hitbox.origin[1], hitbox.width, hitbox.height);
		}
	};
})();
