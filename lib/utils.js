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
		amount *= window.LEVEL;
		window.SCORE += amount;
		if (window.options.runTransitions) {
			$("#score").css({"border": "1px solid red",
											 "color": "yellow",
											 "background-color": "orange"});
			var $scoreFlash = $("#score-flash");
			$scoreFlash.html("+" + amount);
			handleScoreFlashTrans($scoreFlash, amount);
		}
	};
	
	var handleScoreFlashTrans = function($elem, amount){
		if (amount >= 100 && amount < 500){
			$elem.css({"font-size": "30px", "color": "#FF9933"});
		} else if (amount >= 500 && amount < 1000){
			$elem.css({"font-size": "40px", "color": "#FF6600"});
		} else if (amount >= 1000){
			$elem.css({"font-size": "50px", "color": "#FF0000"});
		} else {
			$elem.css({"font-size": "20px", "color": "#FFFF00"});
		};
		$elem.css({"top": "250px", "opacity": "1"});
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
