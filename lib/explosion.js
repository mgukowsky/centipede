(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Explosion = Centipede.Explosion = function (object) {
		this.x = object.x;
		this.y = object.y;
		this.timeStamp = window.MASTER_TIMER;
	};
})();
