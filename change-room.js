var room = {x: 1, y: 1};
var level = 0;
var maps = [
	[
		[{reindeers: 10}, {snails: 4, doors: 1}, {}],
		[{reindeers: 4},  {steves: 1, keys: 1, snails: 3},   {reindeers: 2, littleGuys: 48}],
		[{},              {},               {reindeers: 5}],
		[null,            {},               null],
	],
	[
		[{reindeers: 1},              {snails: 1}, {}],
		[{reindeers: 4},              {reindeers: 2, snails: 3},   {badGuys: 5, reindeers: 2, littleGuys: 4}],
		[{doors: 1, badGuys: 3},      {keys: 1},               {reindeers: 5}],
		[null,                        {reindeers: 15},           null],
	],
	[
		[{reindeers: 10}, {snails: 4, badGuys: 3}, {}],
		[{reindeers: 4},  {reindeers: 3, steves: 1, badGuys: 3},   {badGuys: 5, doors: 1, reindeers: 2, littleGuys: 4}],
		[{keys: 1},      {},               {reindeers: 5}],
		[null,            {},               null],
	],
	[
		[{reindeers: 10},         {snails: 4, badGuys: 3}, {}],
		[{reindeers: 4},          {badGuys: 3, reindeers: 3, steves: 1, snails: 3},   {badGuys: 5, reindeers: 2, littleGuys: 4}],
		[{doors: 1, badGuys: 10}, {badGuys: 12, keys: 1},                             {reindeers: 5}],
		[null,            {},               null],
	],
];
var originalMaps = [];
for (var i = 0; i < maps.length; i += 1) {
	originalMaps[i] = [];
	for (var j = 0; j < maps[i].length; j += 1) {
		originalMaps[i][j] = [];
		for (var k = 0; k < maps[i][j].length; k += 1) {
			if (!maps[i][j][k]) {
				originalMaps[i][j][k] = null;
			} else {
				originalMaps[i][j][k] = Object.assign({}, maps[i][j][k]);
			}
		}
	}
}

function resetLevel() {
	for (var i = 0; i < maps[level].length; i += 1) {
		for (var j = 0; j < maps[level][i].length; j += 1) {
			maps[level][i][j] = Object.assign({}, originalMaps[level][i][j]);
		}
	}
}

function changeRoom(x, y) {
	if (!maps[level][y] || !maps[level][y][x]) {
		if (y - room.y === 1) {
			player.translate.y = 45;
		} else if (y - room.y === -1) {
			player.translate.y = 0;
		}

		if (x - room.x === 1) {
			player.translate.x = 81;
		} else if (x - room.x === -1) {
			player.translate.x = 0;
		}
		return;
	}

	if (y - room.y === 1) {
		player.translate.y = 2;
	} else if (y - room.y === -1) {
		player.translate.y = 43;
	}

	if (x - room.x === 1) {
		player.translate.x = 2;
	} else if (x - room.x === -1) {
		player.translate.x = 79;
	}

	room.x = x;
	room.y = y;

	var obj = maps[level][room.y][room.x];

	// remove everything but player
	for (var nonPlayer in nonPlayers) {
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			nonPlayers[nonPlayer][i].model.parentNode.removeChild(nonPlayers[nonPlayer][i].model);
		}
		nonPlayers[nonPlayer].length = 0;
	}

	// add objects
	for (var prop in obj) {
		if (nonPlayers[prop]) {
			for (var i = 0; i < obj[prop]; i += 1) {
				nonPlayers[prop].push(eval('new ' + prop.charAt(0).toUpperCase() + prop.slice(1, -1) + '()'));
			}
		}
	}
	console.log(room, obj);
}
