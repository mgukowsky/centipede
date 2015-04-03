(function () {
	if (typeof Centipede === "undefined") {
		window.Centipede = {};
	};
	
	var Utils = Centipede.Utils = {};
	
	Utils.getRandomMultipleOfTwenty = function() {
		var num = Math.floor(Math.random() * (100)) * 10;
		if (num % 20 === 0) {
			return num;
		} else {
			return num + 10;
		};
	};
	
	Utils.updateScore = function(amount) {
		//TODO: add some sort of trigger for CSS animations, the degree of which is determined by the amount argument
		window.SCORE += amount;
	};
})();
