class Player {
	constructor() {
		this.health = 5;
		this.power = 0;
		this.items = [];
		this.translate = {};
		this.facingRight = true;
		this.action = 'none';
		this.pullingOnce = false;
		this.pullingRef = 0;
	}

	update() {
		this.action = 'none';

		if (nok.key.five || nok.key.eight || nok.key.seven || nok.key.nine) {
			this.action = 'walking';
		}
		if (nok.key.five)
			this.translate.y--
		if (nok.key.eight)
			this.translate.y++
		if (nok.key.seven) {
			this.translate.x--
			this.facingRight = false;
		}
		if (nok.key.nine) {
			this.translate.x++
			this.facingRight = true;
		}

		if (objects.snakes[0].action === 'pulling') {
			if (!this.pullingOnce) {
				this.pullingOnce = true;
				this.pullingRef = this.translate.x;
				setTimeout(function () {
					this.pullingOnce = false;
					this.pullingRef = 0;
					objects.snakes[0].action = 'none';
				}, 2000);
			}
			spr = playerSpr[5];
			this.translate.x = this.pullingRef + Math.abs(frame%30-15);
		} else if (this.action === 'none') {
			spr = playerSpr[0];
		} else if (this.action === 'walking') {
			spr = playerSpr[Math.floor(frame/4)%3 + 2];
		}
		if (this.facingRight) {
			spr = flip(spr);
		}
		nok.sprite(spr, this.translate.x, this.translate.y - 10)
	}
}
