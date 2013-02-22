
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
	
	app.graphics.rectangle("line", info.x, info.y, info.w, info.h);
	app.graphics.print(text, x, y);
}

function drawGameMenu() {
	if (game_state != game_state_menu) return;
	
	app.graphics.setColor(title_color);
	app.graphics.setFont(title_font, title_style, title_size);
	app.graphics.print(title, 100, 100);
	
	drawMenu(menues.start.text, menues.start.x, menues.start.y);
}

function clickStartMenu(x, y) {
	if (game_state != game_state_menu) return;
	
	var info = menuInfo(menues.start.text, menues.start.x, menues.start.y);
	if (!info.inside) return;
	
	var advisor = newAdvisor();
	advisor.newGame = true;
	doStuff(advisor);
}

function clickContinueMenu(x, y) {
	if (game_state != game_state_die) return;
	
	var info = menuInfo(menues.continue.text,
						menues.continue.x,
						menues.continue.y);
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
	clickMainMenu(x, y);
}
