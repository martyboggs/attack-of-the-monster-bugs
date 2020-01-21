// in update function, what comes first?
// collisions
// checking and acting on action
// drawing objects

class Player {
	constructor() {
		this.health = 5;
		this.power = 0;
		this.items = [];
		this.translate = {};
		this.facingRight = true;
		this.action = 'none';
		this.pullingRef = 0;
		this.pullX = 15;
	}

	update() {
		var spr;
		this.action = 'none';
		var originalTranslate = {x: this.translate.x, y: this.translate.y};

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

		if (snake.action === 'pulling') {
			if (!this.pullingRef) {
				this.pullingRef = this.translate.x;
				this.pullX = 15;
				setTimeout(function () {
					this.pullingRef = 0;
					snake.action = 'holstered';
				}.bind(this), 2000);
			}
			spr = playerSpr[5];
			this.translate.x = this.pullingRef + 2 * Math.abs(this.pullX%30-15);
			this.pullX += 1;
		} else if (this.action === 'none') {
			spr = playerSpr[0];
		} else if (this.action === 'walking') {
			spr = playerSpr[Math.floor(frame/4)%3 + 2];
		}
		if (this.facingRight) {
			spr = flip(spr);
		}

		if (!collision(this, {translate: {x: 42, y: 28}}, 42, 24)) {
			this.translate = originalTranslate;
		}

		nok.sprite(spr, this.translate.x - 3, this.translate.y - 11)
	}
}
