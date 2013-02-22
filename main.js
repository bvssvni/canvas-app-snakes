
var snake = [];
var units = 16;
var direction = [1, 0];
// Number of updates between each move.
var counter = 0;
var counter_start = 15;
var lives = 0;
var game_start_lives = 3;
var dead_text = "You died!";
var game_over_text = "Game Over";
var game_over_font = "Georgia";
var game_over_color = "#FF0000";
var game_over_style = "bold";
var game_over_size = 40;
var game_over_pos = [200, 200];
var dead_lives_text = "Lives left: ";
var dead_text_color = "#FF0000";
var dead_text_pos = [300, 200];
var dead_text_font = "Georgia";
var dead_text_size = 20;
var dead_text_style = "bold";
var dead_lives_text_font = "Georgia";
var dead_lives_text_color = "#FF00000";
var dead_lives_text_pos = [300, 220];
var dead_lives_text_size = 20;
var dead_lives_text_style = "bold";

var start_rectangle = [280, 170, 200, 40];
var title_color = "#0000FF";
var title_font = "Georgia";
var title_style = "bold";
var title_size = 40;
var menu_font = "Georgia";
var menu_style = "bold";
var menu_size = 20;
var menu_mouseover_size = [200, 40];
var title = "Game of Snake";
var menu_mouseover_color = "#FF0000";
var menu_inactive_color = "#0000FF";
var menues = {
start: {x: 300, y: 200, text: "Start"},
continue: {x: 300, y: 300, text: "Continue"},
mainMenu: {x: 300, y: 340, text: "Main Menu"}
};
var game_units_width = 0;
var game_units_height = 0;

var game_state_menu = 0;
var game_state_play = 1;
var game_state_die = 2;
var game_state = 0;
var fruits = [];
var fruit_count = 20;
var fruit_color = "#0000FF";
var eat_fruit = false;

var last_game_state = null;
var first_game_state = null;

function newGameState(snake, fruits, direction) {
	return {snake: snake.slice(0),
	fruits: fruits.slice(0),
		direction: direction};
}

function restoreGameState(state) {
	snake = state.snake.slice(0);
	fruits = state.fruits.slice(0);
	direction = state.direction;
}

function resetCounter() {
	counter = counter_start;
}

function drawGameOver() {
	var g = app.graphics;
	g.setColor(game_over_color);
	g.setFont(game_over_font, game_over_style, game_over_size);
	g.print(game_over_text, game_over_pos[0], game_over_pos[1]);
	
	drawMenu(menues.mainMenu.text, menues.mainMenu.x, menues.mainMenu.y);
}

function drawDead() {
	if (game_state != game_state_die) return;
	
	var g = app.graphics;
	g.setColor(dead_text_color);
	g.setFont(dead_text_font, dead_text_style, dead_text_size);
	
	if (lives == 0) {
		drawGameOver();
		return;
	}
	
	g.print(dead_text, dead_text_pos[0], dead_text_pos[1]);
	
	g.setColor(dead_lives_text_color);
	g.setFont(dead_lives_text_font, dead_lives_text_style, dead_lives_text_size);
	g.print(dead_lives_text + lives,
			dead_lives_text_pos[0],
			dead_lives_text_pos[1]);
	
	drawMenu(menues.continue.text, menues.continue.x, menues.continue.y);
	drawMenu(menues.mainMenu.text, menues.mainMenu.x, menues.mainMenu.y);
}

function load() {
	game_units_width = Math.floor(app.graphics.getWidth() / units);
	game_units_height = Math.floor(app.graphics.getHeight() / units);
}

function update() {
	counter--;
	if (counter == 0) {
		resetCounter();
		moveSnakeForward();
	}
}

function draw() {
	app.graphics.clear("#FFFFFF");
	drawFruit();
	drawSnake();
	drawGameMenu();
	drawDead();
}

function keypressed(keyCode) {
	var isRight = app.keyboard.isRight(keyCode);
	var isDown = app.keyboard.isDown(keyCode);
	var isLeft = app.keyboard.isLeft(keyCode);
	var isUp = app.keyboard.isUp(keyCode);
	
	var head = snake[snake.length-1];
	var neck = snake[snake.length-2];
	var isNeckRight = head[0]-neck[0] == -1;
	var isNeckDown = head[1]-neck[1] == -1;
	var isNeckLeft = head[0]-neck[0] == 1;
	var isNeckUp = head[1]-neck[1] == 1;
	
	var turnRight = isRight && !isNeckRight;
	var turnDown = isDown && !isNeckDown;
	var turnLeft = isLeft && !isNeckLeft;
	var turnUp = isUp && !isNeckUp;
	
	if (turnRight) direction = [1, 0];
	if (turnDown) direction = [0, 1];
	if (turnLeft) direction = [-1, 0];
	if (turnUp) direction = [0, -1];
	
	moveSnakeForward();
	
	var advisor = newAdvisor();
	advisor.turn = true;
	doStuff(advisor);
}

function keyreleased(keyCode) {
	
}

function mousemove(x, y) {
	
}

function mousepressed(button, x, y) {
	clickMenu(x, y);
}

function mousereleased(button, x, y) {
	
}


