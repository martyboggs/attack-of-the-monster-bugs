class Spark {
	constructor(translate) {
		this.translate = {x: translate.x, y: translate.y};
		this.speed = {x: Math.random() - 0.5, y: -5 * Math.random()};
		this.originalY = this.translate.y + 4;
	}

	update() {
		this.translate.x += this.speed.x;
		this.translate.y += this.speed.y;
		this.speed.y += 0.5; // gravity;
		
		nok.line(this.translate.x, this.translate.y, this.translate.x, this.translate.y);

		if (this.translate.y > this.originalY) {
			objects.sparks.splice(objects.sparks.indexOf(this), 1);
		}
	}
}
