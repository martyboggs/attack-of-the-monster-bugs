class Snake {
	constructor() {
		this.translate = {};
		this.action = 'none';
		this.slitherSpeed; // set in reset
	}

	update() {
		if (this.action === 'none') {
			this.translate.x = Math.floor(4 * Math.sin(timer)) + 50;
			if (collision(player, this, 10, 3)) {
				this.action = 'pulling';
			}
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
			if (nok.key.six) {
				this.action = 'striking';
				this.slitherSpeed = 10;
			}
			this.translate.x = player.translate.x;
			this.translate.y = player.translate.y - 5;
		} else if (this.action === 'striking') {
			this.strike();
			if (!nok.key.six) {
				this.action = 'holstered';
			}
			this.translate.x = player.translate.x + (player.facingRight ? 9 : -9);
			this.translate.y = player.translate.y - 5;
		}

		if (this.action !== 'pulling') {
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x - 7, this.translate.y - 1);
		}
	}

	strike() {
		for (var prop in objects) {
			if (prop === 'badGuys' || prop === 'badGuy2s') {
				for (var i = 0; i < objects[prop].length; i += 1) {
					if (collision(this, objects[prop][i], 10, 3)) {
						for (var j = 0; j < 3; j += 1) {
							objects.sparks.push(new Spark(objects[prop][i].translate));
							objects[prop][i].health -= 1;
						}
					}
				}
			}
		}
	}
}
