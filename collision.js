

function collideWithSnake(snake) {
	if (game_state != game_state_play) return;
	
	var headIndex = snake.length - 1;
	var head = snake[headIndex];
	var x = head[0];
	var y = head[1];
	x += direction[0];
	y += direction[1];
	
	var n = snake.length-1;
	for (var i = 0; i < n; i++) {
		var pos = snake[i];
		if (pos[0] == x && pos[1] == y) {
			var advisor = newAdvisor();
			advisor.die = true;
			doStuff(advisor);
			return;
		}
	}
}


function collideWithWalls(snake) {
	if (game_state != game_state_play) return;
	
	var headIndex = snake.length - 1;
	var head = snake[headIndex];
	var x = head[0];
	var y = head[1];
	x += direction[0];
	y += direction[1];
	
	if (x < 0 || x >= game_units_width ||
		y < 0 || y >= game_units_height) {
		var advisor = newAdvisor();
		advisor.die = true;
		doStuff(advisor);
		return;
	}
}

