class BadGuy2 {
	constructor(translate) {
		this.health = 25;
		this.power = 0;
		this.items = [];
		this.xRand = rand(10, 70);
		this.yRand = rand(30, 40);
		this.oscRand = rand(0, 10);
		this.translate = translate;
		this.action = 'none';
	}

	update() {
		// collision with player
		if (collision(this, player, 4, 4)) {
			dead();
		}

		// follow
		if (frame % 4 === 0) {
			if (this.translate.x !== player.translate.x) {
				this.translate.x += this.translate.x < player.translate.x ? 1 : -1;
			}
			if (this.translate.y !== player.translate.y) {
				this.translate.y += this.translate.y < player.translate.y ? 1 : -1;
			}	
		}

		if (this.health <= 0) {
			objects.badGuy2s.splice(objects.badGuy2s.indexOf(this), 1);
		}

		nok.sprite(badSpr2, this.translate.x, this.translate.y - 2);
	}
}
