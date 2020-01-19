class BadGuy {
	constructor() {
		this.health = 5;
		this.power = 0;
        this.items = [];
        this.active = true;
        this.xRand = rand(10, 70);
        this.yRand = rand(10, 40);
        this.oscRand = rand(0, 10);
        this.translate = {x: 20, y: this.yRand};
	}

	update() {
        this.translate.x = Math.floor(10 * Math.sin(timer + this.oscRand)) + this.xRand;

        if (collision(this, player, 3, 3)) {
            objects.badGuys.splice(objects.badGuys.indexOf(this), 1);
        }

        if (this.active) {
            nok.sprite(badSpr, this.translate.x, this.translate.y + 10)
        }

	}
}
