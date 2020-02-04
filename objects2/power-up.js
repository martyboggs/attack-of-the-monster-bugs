class PowerUp {
	constructor(translate) {
		this.translate = {x: translate.x, y: translate.y};
		this.created = frame;
		this.type = Math.floor(4 * Math.random());
		this.lastCheck = false;
		this.target = null;
	}

	update() {
		if (this.target) {
			this.translate.x = lerp(this.translate.x, this.target.x, 0.2);
			this.translate.y = lerp(this.translate.y, this.target.y, 0.2);

			// gun part reached top
			if (!this.lastCheck && 
				Math.abs(this.translate.x - this.target.x) < 0.1 &&
				Math.abs(this.translate.y - this.target.y) < 0.1) {
				this.lastCheck = true;
				if (!gunImminent && player.build.length === 4) {
					gunVibrate = 1;
					gunImminent = true;
					setTimeout(function () {
						objects.guns.push(new Gun());
						gun.play();
						gunVibrate = 0;
						gunClear();
						gunImminent = false;
					}, 2000);
				}
			}
		} else {
			// pick up powerup
			if (collision(player, this, 3, 3)) {
				if (this.type === 0 || gunImminent) { // just give 'em a point if gun is imminent
					good1.play();
					objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
					score += 1;
				} else {
					if (gunModel[player.build.length] === this.type) {
						this.target = {
							x: gunCoords[player.build.length][0],
							y: gunCoords[player.build.length][1]
						};
						// add gun section
						player.build.push(this);
						// sound
						if (player.build.length === 1) good1.play();
						else if (player.build.length === 2) good2.play();
						else if (player.build.length === 3) good3.play();
						else if (player.build.length === 4) good4.play();
					} else {
						objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
						gunClear();
						bad.play();
					}
				}
			}

			// you destroyed the powerup
			if (frame - this.created >= 20) {
				if (snake.action === 'striking' && collision(this, snake, 10, 3)) {
					objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
					blip.play();
				}
			}

			// too slow
			if (frame - this.created >= 120) {
				objects.powerUps.splice(objects.powerUps.indexOf(this), 1);
			}
		}
		nok.sprite(powerUpSpr[this.type][frame%2], 
			this.translate.x - 1 + (gunVibrate && player.build.indexOf(this) !== -1 ? frame%2 : 0), 
			this.translate.y - 1
		);
	}
}
