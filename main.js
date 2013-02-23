
var levels = [1, 5, 10, 20, 40, 50, 60, 80, 100, 120];

var header_height = 16;
var header_color = "#000000";
var header_text_color = "#FFFFFF";
var header_font = "Georgia";
var header_style = "bold";
var header_size = 14;
var level = 0;
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

function drawHeader() {
	if (game_state != game_state_play) return;
	
	var w = app.graphics.getWidth();
	app.graphics.setColor(header_color);
	app.graphics.rectangle("fill", 0, 0, w, header_height);
	
	app.graphics.setFont(header_font, header_style, header_size);
	app.graphics.setColor(header_text_color);
	app.graphics.print("Level " + (level+1), 0, header_height - 2);
	
	app.graphics.print("Lives " + lives, 200, header_height - 2);
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
	app.graphics.clear("#000000");
	
	app.graphics.setColor("#FFFFFF");
	app.graphics.rectangle("fill",
						   0,
						   header_height,
						   units * game_units_width,
						   units * game_units_height);
	
	drawFruit();
	drawSnake();
	drawGameMenu();
	drawDead();
	drawHeader();
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


