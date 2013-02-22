
function load_mouse(box) {
	if (box == null) throw "Missing argument \"box\"";
	
	var mouse = {};
	mouse.x = 0;
	mouse.y = 0;
	mouse.left = false;
	mouse.right = false;
	mouse.middle = false;
	
	mouse.getX = function() {
		return mouse.x;
	}
	
	mouse.getY = function() {
		return mouse.y;
	}
	
	mouse.isDown = function(button) {
		if (button == null) throw "Missing argument \"button\"";
		
		if (button == "l") return mouse.left;
		if (button == "m") return mouse.middle;
		if (button == "r") return mouse.right;
		
		return false;
	}
	
	box.onmousemove = function(event) {
		event = event || window.event;
		
		mouse.x = event.clientX - box.offsetLeft;
		mouse.y = event.clientY - box.offsetTop;
		
		if (typeof(mousemove) == "function") mousemove(mouse.x, mouse.y);
	}
	
	box.onmousedown = function(event) {
		event = event || window.event;
		
		var button = null;
		switch (event.button) {
			case 0: mouse.left = true; button = "l"; break;
			case 1: mouse.middle = true; button = "m"; break;
			case 2: mouse.right = true; button = "r"; break;
		}
		
		mouse.x = event.clientX - box.offsetLeft;
		mouse.y = event.clientY - box.offsetTop;
		if (document.activeElement != box) return;
		if (typeof(mousepressed) == "function") {
			mousepressed(button, mouse.x, mouse.y);
		}
	}
	
	box.onmouseup = function(event) {
		event = event || window.event;
		
		var button = null;
		switch (event.button) {
			case 0: mouse.left = false; button = "l"; break;
			case 1: mouse.middle = false; button = "m"; break;
			case 2: mouse.right = false; button = "r"; break;
		}
		
		mouse.x = event.clientX - box.offsetLeft;
		mouse.y = event.clientY - box.offsetTop;
		if (typeof(mousereleased) == "function") {
			mousereleased(button, mouse.x, mouse.y);
		}
	}
	
	return mouse;
}