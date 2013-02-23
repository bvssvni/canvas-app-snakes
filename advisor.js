"use strict";

function newAdvisor() {
	return {
	newGame: false,
	restartLevel: false,
	continueNextLevel: false,
	nextLevel: false,
    mainMenu: false,
	die: false,
	turn: false
	};
}

function shouldSetDirectionRight(advisor) {
	return advisor.newGame || advisor.continueNextLevel;
}

function shouldStoreLastGameState(advisor) {
	return advisor.newGame || advisor.continueNextLevel;
}

function shouldResetSnake(advisor) {
	return advisor.newGame || advisor.continueNextLevel;
}

function shouldLoadFruit(advisor) {
	return advisor.newGame || advisor.continueNextLevel;
}

function shouldResetCounter(advisor) {
	return advisor.newGame || advisor.continueNextLevel || advisor.turn;
}

function shouldRestoreLastGameState(advisor) {
	return advisor.restartLevel;
}

function shouldSetGameStateToPlay(advisor) {
	return advisor.restartLevel ||
	advisor.newGame ||
	advisor.continueNextLevel;
}

function shouldSetGameStateToMenu(advisor) {
	return advisor.mainMenu;
}

function shouldSetGameStateToDead(advisor) {
	return advisor.die;
}

function shouldSetGameStateToNextLevel(advisor) {
	return advisor.nextLevel;
}

function shouldResetLives(advisor) {
	return advisor.newGame;
}

function shouldDecrementLives(advisor) {
	return advisor.die;
}

function shouldIncrementLivesWith3(advisor) {
	return advisor.continueNextLevel;
}

function shouldIncrementLevel(advisor) {
	return advisor.continueNextLevel;
}

function shouldResetLevel(advisor) {
	return advisor.newGame;
}

function doStuff(advisor) {
	if (shouldIncrementLevel(advisor))
		level++;
	if (shouldResetLevel(advisor)) {
		level = 0;
	}
	
	if (shouldSetDirectionRight(advisor))
		direction = [1, 0];
	if (shouldResetSnake(advisor))
		resetSnake();
	if (shouldLoadFruit(advisor)) {
		loadFruit();
	}
	if (shouldStoreLastGameState(advisor)) {
		last_game_state = newGameState(snake, fruits, direction);
	}
	if (shouldResetCounter(advisor))
		counter = counter_start;
	
	if (shouldRestoreLastGameState(advisor)) {
		restoreGameState(last_game_state);
	}
	if (shouldSetGameStateToPlay(advisor)) {
		game_state = game_state_play;
	}
	if (shouldSetGameStateToMenu(advisor))
		game_state = game_state_menu;
	if (shouldSetGameStateToNextLevel(advisor))
		game_state = game_state_next_level;
	if (shouldResetLives(advisor))
		lives = game_start_lives;
	if (shouldDecrementLives(advisor))
		lives--;
	if (shouldIncrementLivesWith3(advisor))
		lives += 3;
	if (shouldSetGameStateToDead(advisor))
		game_state = game_state_die;
}
