
function addRandomFruit(isPositionTakenFunc) {
	for (var i = 0; i < 10; i++) {
		var x = Math.floor(Math.random() * game_units_width);
		var y = Math.floor(Math.random() * game_units_height);
		if (isPositionTakenFunc(x, y)) continue;
		
		fruits.push([x, y]);
		break;
	}
}

function hitSnake(x, y) {
	for (var i = 0; i < snake.length; i++) {
		var pos = snake[i];
		if (pos[0] == x && pos[1] == y) {
			return true;
		}
	}
	
	return false;
}

function loadFruit() {
	fruit = [];
	var n = level > levels.length ? fruit_count : levels[level];
	for (var i = 0; i < n; i++) {
		addRandomFruit(hitSnake);
	}
}

function eatFruit() {
	if (game_state != game_state_play) return;
	
	var headIndex = snake.length-1;
	var head = snake[headIndex];
	var x = head[0];
	var y = head[1];
	
	var n = fruits.length;
	for (var i = 0; i < n; i++) {
		var pos = fruits[i];
		if (pos[0] == x && pos[1] == y) {
			eat_fruit = true;
			fruits.splice(i, 1);
			
			if (fruits.length == 0) {
				var advisor = newAdvisor();
				advisor.nextLevel = true;
				doStuff(advisor);
			}
			
			return;
		}
	}
}


function drawFruit() {
	if (game_state != game_state_play) return;
	
	app.graphics.setColor(fruit_color);
	for (var i = 0; i < fruits.length; i++) {
		var pos = fruits[i];
		app.graphics.rectangle("fill",
							   units * pos[0],
							   units * pos[1] + header_height,
							   units,
							   units);
	}
}
