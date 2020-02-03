class Boss {
	constructor() {
		this.health = 55;
		this.xRand = player.translate.x > 42 ? rand(2, 40) : rand(44, 82);
		this.yRand = player.translate.y > 24 ? rand(2, 22) : rand(26, 46);
		this.translate = {x: 20, y: this.yRand};
		this.action = 'none';
		this.createdFrame = frame;
	}

	update() {
		// collision with player
		if (frame - this.createdFrame > 60 && collision(this, player, 3, 3)) {
			return dead();
		}

		nok.sprite(badSpr, this.translate.x - 2, this.translate.y - 1);

		if (this.health <= 0) {
			objects.bosses.splice(objects.bosses.indexOf(this), 1);
			score += 20;
			objects.powerUps.push(new PowerUp(this.translate));
			return;
		}
		
		this.translate.x += Math.sin(timer) * 20;
		this.translate.y += Math.cos(timer) * 20;

		// rect(pattern 0-6, x, y, width, height)
		nok.rect(6, this.translate.x - 5, this.translate.y - 5, 10, 10) 

		// nok.line(10, 10, 50, 25) //line(start x, start y, end x, end y)
		// nok.circle(Math.floor(Math.sin(timer) * 10), 70, 20) //circle(radius,x, y)
	}
}
		