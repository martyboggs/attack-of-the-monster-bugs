var timer = 0
var player;
var snake;
var frame = 0;
var score = 0;
var running = true;
var spawnRate; // set in reset
var round = 1;
var drawing;
var enemies = ['badGuys', 'badGuy2s', 'bosses'];
var gunVibrate = 0;
var gunCoords = [
	[20.5, 4.5], [20.5, 1.5], [23.5, 1.5], [26.5, 1.5],
];

// try to make it so multiple playthroughs aren't necessary to know how to win (points should teach) (positive reinforcement)
// new enemies balance out new weapons
// bosses in the slow parts
// bonus points for guys killed in 5 frames for example
// one other interesting scene to capitalize on breaking up environment monotony

function init() {
	//sprites are a 2d array -1 is transparent 0-6 are the patterns
	player = new Player();
	snake = new Snake();
	objects.players.push(player);
	objects.snakes.push(snake);
	reset();
}
function draw(dt) {
	timer += 0.1*dt

	if (running) {
		nok.clear(0) //clear(pattern 0-6)

		// ground
		for (var i = 0; i < 5; i += 1) {
			for (var j = 0; j < 5; j += 1) {
				nok.line(
					16 * i + 7 + (j % 2 === 0 ? 5 : 0), 
					8 * j + 7, 
					16 * i + 7 + (j % 2 === 0 ? 5 : 0), 
					8 * j + 7
				);
			}
		}

		nok.number(score, 1, 1) //number(value, x, y)

		// gameplay
		if (frame % spawnRate === 0) {
			objects.badGuys.push(new BadGuy());
		}
		if (frame % 120 === 0) {
			if (spawnRate >= [0, 12, 10, 8, 6, 4][round]) {
				spawnRate -= 1;
			} else {
				spawnRate = 50;
				if (round >= 5) alert('you win');
				round++;
			}
		}
		
		for (var prop in objects) {
			for (var i = 0; i < objects[prop].length; i += 1) {
				objects[prop][i].update();
			}
		}

		frame++;
		if (frame % 600 === 0) {
			score += 5;
		}
	}
}

function rand(a, b) {
	return Math.round((b - a) * Math.random() + a);
}

function flip(arr) {
	var flipped = [];
	for (var i = 0; i < arr.length; i += 1) {
		flipped[i] = [];
		for (var j = arr[i].length - 1; j >= 0; j -= 1) {
			flipped[i].push(arr[i][j]);
		}
	}
	return flipped;
}

function collision(a, b, distanceX, distanceY) {
	if (a.translate.x > b.translate.x - distanceX && a.translate.x < b.translate.x + distanceX &&
	a.translate.y > b.translate.y - distanceY && a.translate.y < b.translate.y + distanceY) {
		return true;
	}
	return false;
}

function invert() {
	var c = B;
	B = W;
	W = c;
}

function dead() {
	if (drawing) return;
	running = false;
	invert();
	setTimeout(function () {
		invert();
		reset();
	}, 2000);
}

function reset() {
	running = true;
	frame = 0;
	score = 0;
	spawnRate = 50;
	player.action = 'none';
	player.translate = {x: 12, y: 15};
	player.facingRight = true;
	player.build = [];
	snake.action = 'none';
	snake.translate = {x: 0, y: 20};
	snake.slitherSpeed = 2;
	snake.pullingRef = 0;
	for (var prop in objects) {
		if (prop === 'players' || prop === 'snakes') continue;
		objects[prop].length = 0;
	}
}

function avg(a, b) {
	return {translate: {
		x: Math.min(a.translate.x, b.translate.x) + Math.round(Math.abs(a.translate.x - b.translate.x) / 2),
		y: Math.min(a.translate.y, b.translate.y) + Math.round(Math.abs(a.translate.y - b.translate.y) / 2)
	}};
}

var gunModel = [1, 2, 2, 3];
function gunClear() {
	for (var i = 0; i < player.build.length; i += 1) {
		objects.powerUps.splice(objects.powerUps.indexOf(player.build[i]), 1);
	}
	player.build = [];
}

function lerp(start, end, amt) {
	return (1-amt)*start+amt*end;
}
