class LittleGuy {
	constructor() {
		this.speed = 0;
		this.maxSpeed = 5;
		this.dir = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
		this.ySpeed = 0;
		this.y0 = -24;
		this.action = 'walking';
		this.translate = {x: Math.floor(Math.random() * 84), y: Math.floor(Math.random() * 48)};
		this.model = document.createElement('div');
		this.model.className = 'guy';
		game.appendChild(this.model);
	}

	update() {
		switch (this.action) {
			case 'walking':
				if (frame % 4 === 0) {
					if (!collision(this, {translate: {x: 42, y: 24}}, 42, 24)) {
						this.dir += 180;
						if (this.dir > 270) this.dir -= 360;
					} else if (frame % 120 === 0) {
						this.dir = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
					}
					if (this.dir === 0) {
						this.translate.x += 1;
					} else if (this.dir === 90) {
						this.translate.y += 1;
					} else if (this.dir === 180) {
						this.translate.x -= 1;
					} else if (this.dir === 270) {
						this.translate.y -= 1;
					}
				}
			break;
		}

		this.model.style.transform = 'translate(' + this.translate.x + 'px,' + this.translate.y + 'px)';
	}
}
