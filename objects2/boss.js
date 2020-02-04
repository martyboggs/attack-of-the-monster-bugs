class Boss {
	constructor() {
		this.health = 300 + (round * 50);
		this.x = player.translate.x > 42 
			? rand(10, 40) 
			: rand(44, 72);
		this.y = player.translate.y > 24 ? rand(10, 22) : rand(26, 36);
		this.translate = {x: this.x + 100, y: this.y};
		this.action = 'entrance';
		this.createdFrame = frame;
	}

	update() {
		// collision with player
		if (frame - this.createdFrame > 60 && collision(this, player, 3, 3)) {
			return player.dead();
		}

		if (this.action === 'entrance') {
			this.translate.x -= 0.8;
			this.translate.y = this.y + 10 * Math.cos(timer);
			if (this.translate.x < this.x + 10 * Math.sin(timer)) this.action = 'circling';
		} else if (this.action === 'circling') {
			this.translate.x = this.x + 10 * Math.sin(timer);
			this.translate.y = this.y + 10 * Math.cos(timer);
		}
		// rect(pattern 0-6, x, y, width, height)
		nok.rect((round + 5)%6 + 1, this.translate.x - 5, this.translate.y - 5, 10, 10) 
		if (this.health <= 0) {
			blip.play();
			objects.bosses.splice(objects.bosses.indexOf(this), 1);
			score += 20;
			for (var i = 0; i < 3; i += 1) {
				for (var j = 0; j < 3; j += 1) {
					if (i === 1 && j === 1) continue;
					objects.powerUps.push(new PowerUp({
						x: this.translate.x + 8 * i - 8,
						y: this.translate.y + 8 * j - 8,
					}));
				}
			}
			return;
		}
		

		// nok.line(10, 10, 50, 25) //line(start x, start y, end x, end y)
		// nok.circle(Math.floor(Math.sin(timer) * 10), 70, 20) //circle(radius,x, y)
	}
}
		