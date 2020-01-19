class Player {
	constructor() {
		this.health = 5;
		this.power = 0;
        this.items = [];
        this.active = true;
        this.translate = {x: 20, y: 20};
	}

	update() {
        if (nok.key.five)
            this.translate.y--
        if (nok.key.eight)
            this.translate.y++
        if (nok.key.seven)
            this.translate.x--
        if (nok.key.nine)
            this.translate.x++

        if (this.active) {
            spr = playerSpr[Math.floor(frame/4)%3 + 2];
            if (nok.key.nine) {
                spr = flip(spr);
            }
            nok.sprite(spr, this.translate.x, this.translate.y)
        }

	}
}
