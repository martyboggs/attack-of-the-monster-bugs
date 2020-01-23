class PowerUp {
	constructor(translate) {
		this.translate = {x: translate.x, y: translate.y};
		this.created = frame;
		this.type = frame%4;
	}

	update() {
		// pick up powerup
		if (collision(player, this, 2, 2)) {
			objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
			if (this.type === 0) {
				score += 1;
			} else if (this.type === 1) {
				buildGun(1);
			} else if (this.type === 2) {
				buildGun(2);
			} else if (this.type === 3) {
				buildGun(3);
			}
		}

		// you destroyed the powerup
		if (frame - this.created >= 20) {
			if (snake.action === 'striking' && collision(this, snake, 10, 3)) {
				objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
			}
		}

		// too slow
		if (frame - this.created >= 120) {
			objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
		}

		nok.sprite(powerUpSpr[this.type][frame%2], this.translate.x - 1, this.translate.y - 1);
	}
}
