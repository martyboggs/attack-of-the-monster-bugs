class BadGuy {
	constructor() {
		this.health = 5;
		this.power = 0;
		this.items = [];
		this.xRand = rand(10, 70);
		this.yRand = rand(30, 40);
		this.oscRand = rand(0, 10);
		this.translate = {x: 20, y: this.yRand};
		this.action = 'none';
	}

	update() {
		// collision with player
		if (collision(this, player, 3, 3)) {
			dead();
		}

		if (this.action === 'none') {
			this.translate.x = Math.floor(10 * Math.sin(timer + this.oscRand)) + this.xRand;
			// collision with other bad guys
			for (var i = 0; i < objects.badGuys.length; i += 1) {
				if (objects.badGuys[i] === this) continue;
				if (collision(this, objects.badGuys[i], 8, 8)) {
					this.action = 'joining';
					this.joiner = objects.badGuys[i];
					objects.badGuys[i].action = 'joining';
					objects.badGuys[i].joiner = this;
				}
			}
		} else if (this.action === 'joining') {
			// follow
			if (this.translate.x !== this.joiner.translate.x) {
				this.translate.x += this.translate.x < this.joiner.translate.x ? 1 : -1;
			}
			if (this.translate.y !== this.joiner.translate.y) {
				this.translate.y += this.translate.y < this.joiner.translate.y ? 1 : -1;
			}
			// combine
			if (collision(this, this.joiner, 1, 2)) {
				objects.badGuys.splice(objects.badGuys.indexOf(this), 1);
				objects.badGuys.splice(objects.badGuys.indexOf(this.joiner), 1);
				objects.badGuy2s.push(new BadGuy2(this.translate));
			}
		}

		nok.sprite(badSpr, this.translate.x, this.translate.y - 1);
	}
}
