/*
 keyboard.js - Handles keyboard input for web app.
 BSD license.
 by Sven Nilsen, 2012
 http://www.cutoutpro.com
 
 Version: 0.000 in angular degrees version notation
 http://isprogrammingeasy.blogspot.no/2012/08/angular-degrees-versioning-notation.html
 */

/*
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 
 1. Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 The views and conclusions contained in the software and documentation are those
 of the authors and should not be interpreted as representing official policies,
 either expressed or implied, of the FreeBSD Project.

 */

function load_keyboard(box) {
	if (box == null) throw "Missing argument \"box\"";
	
	var keyboard = {};
	keyboard.metaDown = false;
	keyboard.metaDownTime = 0;
	keyboard.pressed = {};
	
	keyboard.isShift = function(keyCode) {
		return keyCode == 16;
	}
	keyboard.isCtrl = function(keyCode) {
		return keyCode == 17;
	}
	keyboard.isAlt = function(keyCode) {
		return keyCode == 18;
	}
	keyboard.isMeta = function(keyCode) {
		return keyCode == 91;
	}
	keyboard.isUp = function(keyCode) {
		return keyCode == 87 || keyCode == 38;
	}
	keyboard.isRight = function(keyCode) {
		return keyCode == 68 || keyCode == 39;
	}
	keyboard.isDown = function(keyCode) {
		return keyCode == 83 || keyCode == 40;
	}
	keyboard.isLeft = function(keyCode) {
		return keyCode == 65 || keyCode == 37;
	}
	keyboard.isSpace = function(keyCode) {
		return keyCode == 32;
	}
	keyboard.isBackspace = function(keyCode) {
		return keyCode == 8;
	}
	
	box.onkeydown = function(event) {
		event = event || window.event;
		
		var keyCode = event.keyCode;
		if (keyboard.pressed[keyCode]) return;
		
		keyboard.pressed[keyCode] = true;
		if (keyboard.isMeta(keyCode)) {
			keyboard.metaDownTime = new Date().getTime() / 1000
			keyboard.metaDown = true;
		}
		if (keyboard.metaDown) {
			var time = new Date().getTime() / 1000;
			if (time - keyboard.metaDownTime >= 3) {
				keyboard.metaDown = false;
			}
		}
		if (keyboard.metaDown) return;
		if (typeof(keypressed) == "function") keypressed(keyCode);
	}
	box.onkeyup = function(event) {
		event = event || window.event;
		
		var keyCode = event.keyCode;
		keyboard.pressed[keyCode] = false;
		if (keyboard.isMeta(keyCode)) keyboard.metaDown = false;
		if (keyboard.metaDown) return;
		if (typeof(keyreleased) == "function") keyreleased(keyCode);
	}
	
	return keyboard;
}
