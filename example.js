var timer = 0
var objects;
var player;
var frame = 0;
var spr;
var blankSpr = [[]];
var running = true;

// bad guys spawn
// if enough come together, they join to form a monster
// 

function init() {
	//sprites are a 2d array -1 is transparent 0-6 are the patterns
	objects = {
		badGuys: [],
		snakes: [],
		players: [],
	};
	for (var i = 0; i < 10; i += 1) {
		objects.badGuys.push(new BadGuy());
	}
	player = new Player();
	objects.players.push(player);
	objects.snakes.push(new Snake());
	reset();
}
function draw(dt) {
	timer += 0.1*dt

	if (running) {
		nok.clear(0) //clear(pattern 0-6)
		// nok.line(10, 10, 50, 25) //line(start x, start y, end x, end y)
		// nok.rect(6, 20 + Math.sin(timer)*20, 20 + Math.cos(timer) * 20, 10, 10) // rect(pattern 0-6, x, y, width, height)
		nok.circle(Math.floor(Math.sin(timer) * 10), 70, 20) //circle(radius,x, y)
		// nok.number(timer.toFixed(2), 0, 0) //number(value, x, y)
		
		for (var prop in objects) {
			for (var i = 0; i < objects[prop].length; i += 1) {
				objects[prop][i].update();
			}
		}

		nok.sprite(blankSpr, 0, 0);

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
	//
	player.dead = true;
	running = false;
	invert();
	setTimeout(function () {
		invert();
		reset();
	}, 1000);
}

function reset() {
	running = true;
	player.translate = {x: 10, y: 15};
	player.action = 'none';
	player.facingRight = true;
	objects.snakes[0].translate = {x: 0, y: 20};
	objects.snakes[0].action = 'none';
	objects.snakes[0].slitherSpeed = 4;
}