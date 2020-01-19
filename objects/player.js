class Player extends LittleGuy {
	constructor() {
		super();
		this.stunnedTimer = 0;
		this.health = 5;
		this.lives = 3;
		this.power = 0;
		this.items = [];
		this.model.style.position = 'absolute';
	}

	update() {
		if (keys[65] === 2) {
			this.translate.x -= 1;
		}
		if (keys[68] === 2) {
			this.translate.x += 1;
		}
		if (keys[83] === 2) {
			this.translate.y += 1;
		}
		if (keys[87] === 2) {
			this.translate.y -= 1;
		}

		this.model.style.transform = 'translate(' + this.translate.x + 'px,' + this.translate.y + 'px)';

		// change room
		if (this.translate.y < 0) {
			changeRoom(room.x, room.y - 1);
		} else if (this.translate.y > 45) {
			changeRoom(room.x, room.y + 1);
		}
		if (this.translate.x < 0) {
			changeRoom(room.x - 1, room.y);
		} else if (this.translate.x > 81) {
			changeRoom(room.x + 1, room.y);
		}

		if (this.stunnedTimer) {
			this.stunnedTimer -= 1;
			this.model.css.background = this.stunnedTimer % 6 === 0 ? '#00ff88' : 'red';
		}
	}
}
