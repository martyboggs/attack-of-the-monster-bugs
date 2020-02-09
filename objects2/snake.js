class Snake {
	constructor() {
		this.translate = {};
		this.action = 'none';
		this.slitherSpeed; // set in reset
		this.sleeping = 0;
	}

	update() {
		if (this.action === 'none') {
			this.translate.x = Math.floor(4 * Math.sin(timer)) + 50;
			if (this.sleeping <= 0 && collision(player, this, 10, 3)) {
				this.action = 'pulling';
				catchSnake.play();
			}
			this.sleeping--;
		} else if (this.action === 'pulling') {
			this.translate.x = player.facingRight ? player.translate.x : player.translate.x - 8;
			this.translate.y = player.translate.y - 5;
			var wobble = Math.abs(frame%4 - 2) * 2;
			nok.line(
				player.facingRight?player.translate.x+2:player.translate.x-2, 
				player.translate.y - 5, 
				player.facingRight?player.translate.x+15:player.translate.x-15, 
				player.translate.y - 13 + wobble);
		} else if (this.action === 'holstered') {
			this.slitherSpeed = 1;
			if (nok.key.six || nok.key.j) {
				this.action = 'striking';
				this.slitherSpeed = 10;
			}
			this.translate.x = player.translate.x;
			this.translate.y = player.translate.y - 5;
		} else if (this.action === 'striking') {
			this.strike();
			if (!nok.key.six && !nok.key.j) {
				this.action = 'holstered';
			}
			this.translate.x = player.translate.x + (player.facingRight ? 9 : -9);
			this.translate.y = player.translate.y - 5;
		}

		if (spawnInterval < 45 && spawnInterval > 40 && frame % 500 === 0 && 
			(this.action === 'holstered' || this.action === 'striking')) {
				this.action = 'none';
				this.sleeping = 20;
				this.slitherSpeed = 4;
		}

		if (this.action !== 'pulling') {
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x - 7, this.translate.y - 1);
		}
	}

	strike() {
		var enemies = ['badGuy2s', 'bosses', 'badGuys'];
		for (var i = 0; i < enemies.length; i += 1) {
			for (var j = 0; j < objects[enemies[i]].length; j += 1) {
				if (collision(this, objects[enemies[i]][j], 10, 3)) {
					objects[enemies[i]][j].health -= 3;
					for (var k = 0; k < 3; k += 1) {
						objects.sparks.push(new Spark(objects[enemies[i]][j].translate));
					}
				}
			}
		}
	}
}
