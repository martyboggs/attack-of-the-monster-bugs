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
		var enemies = ['badGuy2s', 'bosses', 'badGuys'];
		for (var i = 0; i < enemies.length; i += 1) {
			for (var j = 0; j < objects[enemies[i]].length; j += 1) {
				if (collision(this, objects[enemies[i]][j], 10, 3)) {
					objects.bullets.splice(objects.bullets.indexOf(this), 1);
					objects[enemies[i]][j].health -= 1;
					for (var k = 0; k < 3; k += 1) {
						objects.sparks.push(new Spark(objects[enemies[i]][j].translate));
					}
				}
			}
		}
	}
}
