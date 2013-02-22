
function addRandomFruit() {
	var x = Math.floor(Math.random() * game_units_width);
	var y = Math.floor(Math.random() * game_units_height);
	fruits.push([x, y]);
}

function loadFruit() {
	for (var i = 0; i < fruit_count; i++) {
		addRandomFruit();
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
							   units * pos[1],
							   units,
							   units);
	}
}
