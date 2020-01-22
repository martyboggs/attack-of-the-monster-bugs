class BadGuy {
	constructor() {
		this.health = 5;
		this.power = 0;
		this.items = [];
		this.xRand = player.translate.x > 42 ? rand(2, 40) : rand(44, 82);
		this.yRand = player.translate.y > 24 ? rand(2, 22) : rand(26, 46);
		this.oscRand = rand(0, 10);
		this.translate = {x: 20, y: this.yRand};
		this.action = 'none';
		this.createdFrame = frame;
		this.combineTime = rand(60 * 10, 60 * 100); 
		this.joiner;
		this.joined = false;
	}

	update() {
		// collision with player
		if (collision(this, player, 3, 3)) {
			dead();
		}

		if (this.action === 'none') {
			this.translate.x = Math.floor(10 * Math.sin(timer + this.oscRand)) + this.xRand;
			// collision with other bad guys
			if (this.createdFrame > this.combineTime) {
				for (var i = 0; i < objects.badGuys.length; i += 1) {
					if (objects.badGuys[i] === this) continue;
					if (collision(this, objects.badGuys[i], 8, 8)) {
						this.action = 'joining';
						this.joiner = objects.badGuys[i];
						objects.badGuys[i].action = 'joining';
						objects.badGuys[i].joiner = this;
					}
				}
			}
		} else if (this.action === 'joining') {
			// go towards each other
			if (this.joiner.joined) {
				this.joiner = null;
				this.action = 'none';
				return;
			}
			if (frame % 8 === 0) {
				if (this.translate.x !== this.joiner.translate.x) {
					this.translate.x += this.translate.x < this.joiner.translate.x ? 1 : -1;
				}
				if (this.translate.y !== this.joiner.translate.y) {
					this.translate.y += this.translate.y < this.joiner.translate.y ? 1 : -1;
				}
			}
			// combine
			if (collision(this, this.joiner, 1, 2)) {
				this.joined = true;
				this.joiner.joined = true;
				objects.badGuys.splice(objects.badGuys.indexOf(this), 1);
				objects.badGuys.splice(objects.badGuys.indexOf(this.joiner), 1);
				objects.badGuy2s.push(new BadGuy2(this.translate));
			}
		}

		if (this.health <= 0) {
			objects.badGuys.splice(objects.badGuys.indexOf(this), 1);
			score += 2;
			if (frame % 7 === 0) objects.powerUps.push(new PowerUp(this.translate));
		}

		nok.sprite(badSpr, this.translate.x - 2, this.translate.y - 1);
		this.createdFrame++;
	}
}
