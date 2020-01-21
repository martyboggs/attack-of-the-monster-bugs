class Snake {
	constructor() {
		this.translate = {};
		this.action = 'none';
		this.slitherSpeed;
	}

	update() {
		if (this.action === 'none') {
			this.translate.x = Math.floor(4 * Math.sin(timer)) + 50;
			if (collision(player, this, 10, 3)) {
				this.action = 'pulling';
			}
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x - 6, this.translate.y - 1);
		} else if (this.action === 'pulling') {
			this.translate.x = player.facingRight ? player.translate.x : player.translate.x - 8;
			this.translate.y = player.translate.y - 4;
			var wobble = Math.abs(frame%4 - 2) * 2;
			nok.line(
				player.facingRight?player.translate.x+5:player.translate.x, 
				player.translate.y - 4, 
				player.facingRight?player.translate.x+17:player.translate.x-10, 
				player.translate.y - 12 + wobble);
		} else if (this.action === 'holstered') {
			this.slitherSpeed = 2;
			if (nok.key.six) {
				this.action = 'striking';
				this.slitherSpeed = 10;
			}
			this.translate.x = player.translate.x + 1;
			this.translate.y = player.translate.y - 4;
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x - 6, this.translate.y - 1);
		} else if (this.action === 'striking') {
			this.strike();
			if (!nok.key.six) {
				this.action = 'holstered';
			}
			this.translate.x = player.translate.x + (player.facingRight ? 11 : -8);
			this.translate.y = player.translate.y - 4;
			nok.sprite(snakeSpr[Math.floor(frame/8*this.slitherSpeed)%4], this.translate.x - 6, this.translate.y - 1);
		}
	}

	strike() {
		for (var prop in objects) {
			if (prop === 'badGuys' || prop === 'badGuy2s') {
				for (var i = 0; i < objects[prop].length; i += 1) {
					if (collision(this, objects[prop][i], 10, 3)) {
						console.log('whoooo');
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
