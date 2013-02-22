/*
 timer.js - Game loop with fixed FPS and UPS rate.
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

function load_timer() {
	var now = Date.now;
	if (typeof(now) != "function") {
		now = function() {return new Date().getTime();};
	}
	
	var timer = {};
	
	timer.reset = function() {
		timer.lastFrame = timer.now;
		timer.lastUpdate = timer.now;
		timer.fps = 0;
		timer.fpsCounter = 0;
		timer.fpsStart = timer.now;
		timer.ups = 0;
		timer.upsCounter = 0;
		timer.upsStart = timer.now;
		timer.doDrawing = false;
		timer.doUpdate = false;
	}
	
	timer.start = 0.001 * now();
	timer.now = timer.start;
	timer.frameRate = 60;
	timer.updateRate = 120;
	timer.reset();
	
	timer.update = function() {
		// Fix the update rate.
		do {
			timer.now = 0.001 * now();
			if ((timer.now - timer.lastFrame) >= 0.25) {
				timer.reset();
				break;
			}
			if (timer.now > timer.upsStart + 1) {
				if (timer.now > timer.upsStart + 2) {
					// Reset ups counter.
					timer.upsStart = timer.now;
					timer.upsCounter = 0;
					timer.lastUpdate = timer.now;
				} else {
					// Update ups counter.
					timer.upsStart = timer.now - timer.now % 1;
					timer.ups = timer.upsCounter;
					timer.upsCounter = 0;
				}
			}
			timer.doUpdate = false;
			if ((timer.now - timer.lastUpdate) * timer.updateRate >= 1) {
				timer.upsCounter++;
				timer.lastUpdate += 1/timer.updateRate;
				timer.doUpdate = true;
			}
			if (timer.doUpdate && update != null) update();
		}
		while (timer.doUpdate);
		
		if (timer.now > timer.fpsStart + 1) {
			if (timer.now > timer.fpsStart + 2) {
				// Reset fps counter.
				timer.fpsStart = timer.now;
				timer.fpsCounter = 0;
			} else {
				// Update fps counter.
				timer.fpsStart = timer.now - timer.now % 1;
				timer.fps = timer.fpsCounter;
				timer.fpsCounter = 0;
			}
		}
		
		timer.doDrawing = false;
		if ((timer.now - timer.lastFrame) * timer.frameRate >= 1) {
			timer.fpsCounter++;
			// Jump to last frame if skipped some.
			timer.lastFrame += Math.floor((timer.now - timer.lastFrame) * timer.frameRate) / timer.frameRate;
			timer.doDrawing = true;
		}
		
		if (timer.doDrawing && typeof(draw) == "function") {
			draw();
		}
	}
	
	timer.setFPS = function(frameRate) {
		if (frameRate == null) throw "Missing argument \"frameRate\"";
		
		timer.frameRate = frameRate;
	}
	timer.setUPS = function(updateRate) {
		if (updateRate == null) throw "Missing argument \"updateRate\"";
		
		timer.updateRate = updateRate;
	}
	timer.getFPS = function() {
		return timer.fps;
	}
	timer.getUPS = function() {
		return timer.ups;
	}
	timer.getTime = function() {
		return timer.now - timer.start;
	}
	timer.getDelta = function() {
		return 1/timer.updateRate;
	}
	return timer;
}