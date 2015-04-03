(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {}
	};
	
	var Utils = Centipede.Utils = {};
	
	Utils.updateScore = function(amount) {
		//TODO: add some sort of trigger for CSS animations, the degree of which is determined by the amount argument
		window.SCORE += amount;
	};
})();
