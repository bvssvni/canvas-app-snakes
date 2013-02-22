
function newAdvisor() {
	return {
	newGame: false,
	restartLevel: false,
    mainMenu: false,
	die: false,
	turn: false
	};
}

function shouldSetDirectionRight(advisor) {
	return advisor.newGame;
}

function shouldStoreLastGameState(advisor) {
	return advisor.newGame;
}

function shouldResetSnake(advisor) {
	return advisor.newGame;
}

function shouldLoadFruit(advisor) {
	return advisor.newGame;
}

function shouldResetCounter(advisor) {
	return advisor.newGame || advisor.turn;
}

function shouldRestoreLastGameState(advisor) {
	return advisor.restartLevel;
}

function shouldSetGameStateToPlay(advisor) {
	return advisor.restartLevel || advisor.newGame;
}

function shouldSetGameStateToMenu(advisor) {
	return advisor.mainMenu;
}

function shouldSetGameStateToDead(advisor) {
	return advisor.die;
}

function shouldResetLives(advisor) {
	return advisor.newGame;
}

function shouldDecrementLives(advisor) {
	return advisor.die;
}

function doStuff(advisor) {
	if (shouldSetDirectionRight(advisor))
		direction = [1, 0];
	if (shouldResetSnake(advisor))
		resetSnake();
	if (shouldLoadFruit(advisor))
		loadFruit();
	if (shouldStoreLastGameState(advisor))
		last_game_state = newGameState(snake, fruits, direction);
	if (shouldResetCounter(advisor))
		counter = counter_start;
	
	if (shouldRestoreLastGameState(advisor))
		restoreGameState(last_game_state);
	if (shouldSetGameStateToPlay(advisor))
		game_state = game_state_play;
	if (shouldSetGameStateToMenu(advisor))
		game_state = game_state_menu;
	if (shouldResetLives(advisor))
		lives = game_start_lives;
	if (shouldDecrementLives(advisor))
		lives--;
	if (shouldSetGameStateToDead(advisor))
		game_state = game_state_die;
}
