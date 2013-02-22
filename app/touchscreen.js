
function load_touchscreen(box) {
	var touchscreen = {};
	
	touchscreen.touches = [];
	
	// Disable pinching and zooming in document.
	document.ontouchstart = function() {
		if (typeof(event.preventDefault) == "function") event.preventDefault();
	}
	document.ontouchend = function() {
		if (typeof(event.preventDefault) == "function") event.preventDefault();
	}
	document.ontouchmove = function() {
		if (typeof(event.preventDefault) == "function") event.preventDefault();
	}
	document.ontouchcancel = function() {
		if (typeof(event.preventDefault) == "function") event.preventDefault();
	}
	touchscreen.getTouches = function() {
		return touchscreen.touches;
	}
	
	var updateTouches = function(event) {
		if (typeof(event.preventDefault) == "function") event.preventDefault();
		
		var targetTouches = event.targetTouches;
		if (targetTouches == null || targetTouches.length == 0) {
			if (touchscreen.touches.length != 0) touchscreen.touches = [];
			return;
		}
		
		touchscreen.touches = [];
		for (var i = 0; i < targetTouches.length; i++) {
			var x = targetTouches[i].clientX - box.offsetLeft;
			var y = targetTouches[i].clientY - box.offsetTop;
			var id = targetTouches[i].identifier;
			touchscreen.touches[i] = {"x": x, "y": y, "id": id};
		}
	}
	
	box.ontouchmove = function(event) {
		updateTouches(event);
		
		if (typeof(touchmove) == "function") touchmove();
	}
	
	box.ontouchstart = function(event) {
		updateTouches(event);
		
		if (typeof(touchpressed) == "function") touchpressed();
	}
	
	box.ontouchend = function(event) {
		updateTouches(event);
		
		if (typeof(touchreleased) == "function") touchreleased();
	}
	
	box.ontouchcancel = function(event) {
		updateTouches(event);
		
		if (typeof(touchcancel) == "function") touchcancel();
	}
	
	return touchscreen;
}

