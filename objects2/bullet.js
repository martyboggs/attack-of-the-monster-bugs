class Bullet {
	constructor(translate, angle) {
		this.translate = {x: translate.x, y: translate.y};
		this.angle = angle;
	}

	update() {
		this.translate.x += 4 * Math.cos(this.angle);
		this.translate.y += 4 * Math.sin(this.angle);

		nok.line(
			this.translate.x, 
			this.translate.y, 
			this.translate.x + Math.cos(this.angle), 
			this.translate.y + Math.sin(this.angle)
		);

		// collision
		this.strike();

		if (!collision(this, {translate: {x: 42, y: 24}}, 42, 24)) {
			objects.bullets.splice(objects.bullets.indexOf(this), 1);
		}
	}

	strike() {
		for (var prop in objects) {
			if (prop === 'badGuys' || prop === 'badGuy2s' || prop === 'boss') {
				for (var i = 0; i < objects[prop].length; i += 1) {
					if (collision(this, objects[prop][i], 10, 3)) {
						objects.bullets.splice(objects.bullets.indexOf(this), 1);
						objects[prop][i].health -= 1;
						for (var j = 0; j < 3; j += 1) {
							objects.sparks.push(new Spark(objects[prop][i].translate));
						}
					}
				}
			}
		}
	}
}
