var frame = 0;

var keys = { // 1 up, 2 down
	65: 1,
	68: 1,
	83: 1,
	87: 1,
	74: 1, // j
};

function updateHealth(change) {
	if (player.lives < 0) return;
	player.health += change;
	if (player.health <= 0) {
		player.health = 0;
		if (player.lives > 0) {
			player.health = 5;
		}
		player.items.length = 0;
		updateItems();
		player.power = 0;
		updatePower();
		resetLevel();
		showMessage('You died');
		updateLives(-1);
		changeRoom(1, 1);
		player.model.translate.x = 0;
		player.model.translate.z = 0;
	}
	document.getElementById('health').innerHTML = player.health;
}
function updateLives(change) {
	player.lives += change;
	if (player.lives < 0) {
		showMessage('Game Over', 60 * 1000);
	}
	if (player.lives >= 0) {
		document.getElementById('lives').innerHTML = player.lives;
	}
}
function updateItems(item) {
	if (item) {
		player.items.push(item);
	}
	document.getElementById('items').innerHTML = player.items.length ? 'Items: ' + player.items.join(', ') : '';
}
function updatePower(change) {
	if (change) {
		player.power += change;
	}
	if (player.power > 3000) player.power = 3000;
	if (player.power < 0) player.power = 0;
	document.getElementById('power').innerHTML = player.power;
}
function showMessage(message, time) {
	var m = document.getElementById('messages');
	m.innerHTML = message;
	setTimeout(function () {
		m.innerHTML = '';
	}, time ? time : 5000);
}

window.addEventListener('keydown', function (e) {
	if (keys[e.which] && keys[e.which] !== 2) keys[e.which] = 2;
});
window.addEventListener('keyup', function (e) {
	if (keys[e.which] && keys[e.which] !== 1) keys[e.which] = 1;
});

function inc(a, b) {
	return Math.round((b - a) * Math.random() + a);
}

var frame = 0;
