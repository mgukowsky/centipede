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
		window.SCORE += amount * window.LEVEL;
		if (window.options.runTransitions) {
			$("#score").css({"left": "50px",
											 "border": "10px solid red",
											 "color": "yellow",
											 "font-size": "50px",
											 "height": "200px",
											 "background-color": "orange"});
		}
	};
	
	Utils.updateLives = function() {
		window.LIVES -= 1;
		if (window.options.runTransitions) {
			$("#lives").css({"left": "250px",
											 "border": "10px solid white",
											 "color": "black",
											 "font-size": "50px",
											 "height": "200px",
											 "width": "300px",
											 "background-color": "orange"});
			$("div.content").css({"background-color": "#F00"});
		}
	};
})();
