/*
 graphics.js - Various 2D rendering methods for html5 canvas.
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

function load_graphics(box, context) {
	if (box == null) throw "Missing argument \"box\"";
	if (context == null) throw "Missing argument \"context\"";
	
	var graphics = {};
	
	graphics.getWidth = function() {
		return box.width;
	}
	graphics.getHeight = function() {
		return box.height;
	}
	graphics.setSize = function(width, height) {
		if (width == null) throw "Missing argument \"width\"";
		if (height == null) throw "Missing argument \"height\"";
		
		box.width = width;
		box.height = height;
	}
	graphics.clear = function(color) {
		if (color == null) throw "Missing argument \"color\"";
		
		context.fillStyle = color;
		context.fillRect(0, 0, graphics.getWidth(), graphics.getHeight());
	}
	graphics.line = function(x1, y1, x2, y2) {
		if (x1 == null) throw "Missing argument \"x1\"";
		if (y1 == null) throw "Missing argument \"y1\"";
		if (x2 == null) throw "Missing argument \"x2\"";
		if (y2 == null) throw "Missing argument \"y2\"";
		
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}
	graphics.setColorRGBA = function(r, g, b, a) {
		if (r == null) throw "Missing argument \"r\"";
		if (g == null) throw "Missing argument \"g\"";
		if (b == null) throw "Missing argument \"b\"";
		if (a == null) throw "Missing argument \"a\"";
		
		var color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
		context.fillStyle = color;
		context.strokeStyle = color;
	}
	graphics.setColor = function(color) {
		if (color == null) throw "Missing argument \"color\"";
		
		context.fillStyle = color;
		context.strokeStyle = color;
	}
	graphics.rectangle = function(style, x, y, w, h) {
		if (style == null) throw "Missing argument \"style\"";
		if (x == null) throw "Missing argument \"x\"";
		if (y == null) throw "Missing argument \"y\"";
		if (w == null) throw "Missing argument \"w\"";
		if (h == null) throw "Missing argument \"h\"";
		
		context.beginPath();
		context.rect(x, y, w, h);
		if (style == "line") context.stroke();
		if (style == "fill") context.fill();
	}
	graphics.setLineWidth = function(lineWidth) {
		if (lineWidth == null) throw "Missing argument \"lineWidth\"";
		
		context.lineWidth = lineWidth;
	}
	graphics.ellipse = function (style, x, y, w, h) {
		if (style == null) throw "Missing argument \"style\"";
		if (x == null) throw "Missing argument \"x\"";
		if (y == null) throw "Missing argument \"y\"";
		if (w == null) throw "Missing argument \"w\"";
		if (h == null) throw "Missing argument \"h\"";
		
		var kappa = .5522848;
		var ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle
		
		context.beginPath();
		context.moveTo(x, ym);
		context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		context.closePath();
		if (style == "line") context.stroke();
		if (style == "fill") context.fill();
	}
	graphics.print = function(text, x, y) {
		if (text == null) throw "Missing argument \"text\"";
		if (x == null) throw "Missing argument \"x\"";
		if (y == null) throw "Missing argument \"y\"";
		
		context.fillText(text, x, y);
	}
	graphics.setFont = function(name, style, size) {
		if (name == null) throw "Missing argument \"name\"";
		if (style == null) throw "Missing argument \"style\"";
		if (size == null) throw "Missing argument \"size\"";
		
		var str = style + " " + size + "px " + name;
		context.font = str;
	}
	
	return graphics;
}
