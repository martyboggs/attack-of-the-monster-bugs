drawing = true;
var blankSpr = [[]];
for (var i = 0; i < 48; i += 1) {
	blankSpr[i] = [];
	for (var j = 0; j < 84; j += 1) {
		blankSpr[i][j] = 0;
	}
}
var pencil = false;
canvas.addEventListener('mousedown', function (e) {
	pencil = true;
	write(e);
});
canvas.addEventListener('mouseup', function (e) {
	pencil = false;
});
canvas.addEventListener('mousemove', write);
function write(e) {
	var size = innerHeight / 48;
	if (pencil) {
		if (e.ctrlKey) {
			blankSpr[Math.floor(e.clientY/size)][Math.floor(e.clientX/size)] = 0;
		} else {
			blankSpr[Math.floor(e.clientY/size)][Math.floor(e.clientX/size)] = 1;
		}
	}
}
setTimeout(function () {
	objects.drawTools = [{
		update: function () {
			nok.sprite(blankSpr, 0, 0);
		}
	}];
});
