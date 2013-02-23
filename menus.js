"use strict";

function menuInfo(text, x, y) {
	var textHeight = menu_size;
	
	var mouseX = app.mouse.getX();
	var mouseY = app.mouse.getY();
	
	var offX = -20;
	var offY = -textHeight;
	var s = menu_mouseover_size;
	var inside = mouseX >= x+offX && mouseX < x+offX+s[0]
	&& mouseY >= y+offY && mouseY < y+offY+s[1];
	
	return {x: x + offX, y: y + offY, w: s[0], h: s[1], inside: inside};
}

function drawMenu(text, x, y) {
	var textHeight = menu_size;
	app.graphics.setFont(menu_font, menu_style, textHeight);
	
	var mouseX = app.mouse.getX();
	var mouseY = app.mouse.getY();
	
	var info = menuInfo(text, x, y);
	if (info.inside) {
		app.graphics.setColor(menu_mouseover_color);
	} else {
		app.graphics.setColor(menu_inactive_color);
	}
	
	// app.graphics.rectangle("line", info.x, info.y, info.w, info.h);
	app.graphics.print(text, x, y);
}

function drawGameMenu() {
	if (game_state != game_state_menu) return;
	
	app.graphics.setColor(title_color);
	app.graphics.setFont(title_font, title_style, title_size);
	app.graphics.print(title, 100, 100);
	
	drawMenu(menues.start.text, menues.start.x, menues.start.y);
}

function shouldDrawGameOver() {
	return game_state == game_state_die && lives == 0;
}

function drawGameOver() {
	if (!shouldDrawGameOver()) return;
	
	var g = app.graphics;
	g.setColor(game_over_color);
	g.setFont(game_over_font, game_over_style, game_over_size);
	g.print(game_over_text, game_over_pos[0], game_over_pos[1]);
	
	drawMenu(menues.mainMenu.text, menues.mainMenu.x, menues.mainMenu.y);
}

function drawNextLevel() {
	if (game_state != game_state_next_level) return;
	
	var g = app.graphics;
	g.setColor(game_over_color);
	g.setFont(game_over_font, game_over_style, game_over_size);
	g.print("Excellent!", game_over_pos[0], game_over_pos[1]);
	
	drawMenu("Next Level: " + (level+1), menues.tryAgain.x, menues.tryAgain.y);
}

function shouldDrawDead() {
	return game_state == game_state_die && lives > 0;
}

function drawDead() {
	if (!shouldDrawDead()) return;
	
	var g = app.graphics;
	g.setColor(dead_text_color);
	g.setFont(dead_text_font, dead_text_style, dead_text_size);
	
	g.print(dead_text, dead_text_pos[0], dead_text_pos[1]);
	
	g.setColor(dead_lives_text_color);
	g.setFont(dead_lives_text_font, dead_lives_text_style, dead_lives_text_size);
	g.print(dead_lives_text + lives,
			dead_lives_text_pos[0],
			dead_lives_text_pos[1]);
	
	drawMenu(menues.tryAgain.text, menues.tryAgain.x, menues.tryAgain.y);
	drawMenu(menues.mainMenu.text, menues.mainMenu.x, menues.mainMenu.y);
}

function clickStartMenu(x, y) {
	if (game_state != game_state_menu) return;
	
	var info = menuInfo(menues.start.text, menues.start.x, menues.start.y);
	if (!info.inside) return;
	
	var advisor = newAdvisor();
	advisor.newGame = true;
	doStuff(advisor);
}

function clickContinueNextLevelMenu(x, y) {
	if (game_state != game_state_next_level) return;
	
	
	var info = menuInfo("Next Level: " + (level+1),
						menues.tryAgain.x,
						menues.tryAgain.y);
	if (!info.inside) return;
	
	var advisor = newAdvisor();
	advisor.continueNextLevel = true;
	doStuff(advisor);
}

function clickContinueMenu(x, y) {
	if (game_state != game_state_die) return;
	
	var info = menuInfo(menues.tryAgain.text,
						menues.tryAgain.x,
						menues.tryAgain.y);
	if (!info.inside) return;
	
	var advisor = newAdvisor();
	advisor.restartLevel = true;
	doStuff(advisor);
}

function clickMainMenu(x, y) {
	if (game_state != game_state_die) return;
	
	var info = menuInfo(menues.mainMenu.text,
						menues.mainMenu.x,
						menues.mainMenu.y);
	if (!info.inside) return;
	
	var advisor = newAdvisor();
	advisor.mainMenu = true;
	doStuff(advisor);
}

function clickMenu(x, y) {
	clickStartMenu(x, y);
	clickContinueMenu(x, y);
	clickContinueNextLevelMenu(x, y);
	clickMainMenu(x, y);
}
