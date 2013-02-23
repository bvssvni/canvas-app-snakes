

function resetSnake() {
	snake = [];
	var cx = 0;
	var cy = 0;
	snake.push([cx+0, cy+0]);
	snake.push([cx+1, cy+0]);
	snake.push([cx+2, cy+0]);
}

function drawSnake() {
	if (game_state != game_state_play) return;
	
	app.graphics.setColor("#FF0000");
	for (var i = 0; i < snake.length; i++) {
		var pos = snake[i];
		app.graphics.rectangle("fill",
							   units * pos[0],
							   units * pos[1] + header_height,
							   units,
							   units);
	}
}


function moveSnakeHead() {
	var dir = direction;
	var headIndex = snake.length-1;
	var head = snake[headIndex];
	snake[headIndex] = [head[0]+dir[0], head[1]+dir[1]];
}

function moveSnakeForward() {
	collideWithWalls(snake);
	collideWithSnake(snake);
	if (game_state != game_state_play) return;
	
	var lastPos = snake[0];
	
	var dir = direction;
	var n = snake.length-1;
	for (var i = 0; i < n; i++) {
		snake[i] = snake[i+1];
	}
	
	if (eat_fruit) {
		snake.splice(0, 0, lastPos);
		eat_fruit = false;
	}
	
	moveSnakeHead();
	eatFruit();
}
