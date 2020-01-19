class Player {
	constructor() {
		this.health = 5;
		this.power = 0;
        this.items = [];
        this.active = true;
        this.translate = {x: 20, y: 20};
        this.facingRight = true;
        this.action = 'standing';
	}

	update() {
        this.action = 'standing';

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

        if (this.active) {
            if (this.action === 'standing') {
                spr = playerSpr[0];
            } else if (this.action === 'walking') {
                spr = playerSpr[Math.floor(frame/4)%3 + 2];
            }
            if (this.facingRight) {
                spr = flip(spr);
            }
            nok.sprite(spr, this.translate.x, this.translate.y)
        }

	}
}
