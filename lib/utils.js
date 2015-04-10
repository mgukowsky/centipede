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
	
	Utils.coerceToMultipleOfTwenty = function(num) {
		while (num % 20 !== 0) {
			num % 20 > 10 ? num += 1 : num -= 1;
		};
		return num;
	};
	
	Utils.updateScore = function(amount) {
		//TODO: add some sort of trigger for CSS animations, the degree of which is determined by the amount argument
		window.SCORE += amount * window.LEVEL;
	};
})();
