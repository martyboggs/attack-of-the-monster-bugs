class PowerUp {
	constructor(translate) {
		this.translate = {x: translate.x, y: translate.y};
		this.type = rand(0, 3);
		this.created = frame;
	}

	update() {
		// pick up powerup
		if (collision(player, this, 2, 2)) {
			objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
			score += 1;
		}

		// you destroyed the powerup
		if (frame - this.created >= 20) {
			if (snake.action === 'striking' && collision(this, snake, 10, 3)) {
				objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
				console.log('destroyed');
			}
		}

		// too slow
		if (frame - this.created >= 120) {
			objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
		}

		nok.sprite(powerUpSpr[frame%2], this.translate.x - 1, this.translate.y - 1);
	}
}
