var timer = 0
var objects;
var player;
var snake;
var frame = 0;
var score = 0;
var running = true;
var spawnRate = 50;

// bad guys spawn
// if enough come together, they join to form a monster
// try to make it so multiple playthroughs aren't necessary to know how to win (points should teach) (positive reinforcement)

function init() {
	//sprites are a 2d array -1 is transparent 0-6 are the patterns
	objects = { // order dictates depth
		snakes: [],
		badGuys: [],
		badGuy2s: [],
		sparks: [],
		players: [],
	};
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
		// nok.line(10, 10, 50, 25) //line(start x, start y, end x, end y)
		// nok.rect(6, 20 + Math.sin(timer)*20, 20 + Math.cos(timer) * 20, 10, 10) // rect(pattern 0-6, x, y, width, height)
		// nok.circle(Math.floor(Math.sin(timer) * 10), 70, 20) //circle(radius,x, y)
		// nok.number(timer.toFixed(2), 0, 0) //number(value, x, y)

		if (frame % spawnRate === 0) {
			objects.badGuys.push(new BadGuy());
			spawnRate -= 1;
		}
		
		for (var prop in objects) {
			for (var i = 0; i < objects[prop].length; i += 1) {
				objects[prop][i].update();
			}
		}

		frame++;
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
	player.dead = true;
	running = false;
	invert();
	setTimeout(function () {
		invert();
		reset();
	}, 2000);
}

function reset() {
	running = true;
	player.translate = {x: 10, y: 15};
	player.action = 'none';
	player.facingRight = true;
	snake.translate = {x: 0, y: 20};
	snake.action = 'none';
	snake.slitherSpeed = 2;
	snake.pullingRef = 0;
	frame = 0;
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
