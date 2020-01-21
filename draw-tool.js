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
});
canvas.addEventListener('mouseup', function (e) {
	pencil = false;
});
canvas.addEventListener('mousemove', function (e) {
	console.log(e);
	var size = innerHeight / 48;
	if (pencil) {
		blankSpr[Math.floor(e.clientY/size)][Math.floor(e.clientX/size)] = 1;
	}
});
objects.drawTool = [{
	update: function () {
		nok.sprite(blankSpr, 0, 0);
	}
}];
