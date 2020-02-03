class Gun {
	constructor() {
		this.translate = {};
		this.action = 'none';
		this.angle = 0;
		this.target = null;
		this.createdFrame = frame;
	}

	update() {
		if (this.action === 'none') {
			if (!this.target) {
				this.target = this.findTarget();
				if (this.target) {
					this.action = 'aiming';
				}
			}
		} else if (this.action === 'aiming') {
			var targetAngle = Math.atan2(this.target.translate.y - this.translate.y, this.target.translate.x - this.translate.x);
			if (this.angle > Math.PI) this.angle -= 2 * Math.PI;
			else if (this.angle < -Math.PI) this.angle += 2 * Math.PI;
			// Aiming
			// if (this.angle > targetAngle) this.angle -= Math.PI / 90
			// if (this.angle < targetAngle) this.angle += Math.PI / 90
			this.angle += followAngle(this.angle, targetAngle, Math.PI / 90);
			// FIRE!
			if (Math.abs(this.angle - targetAngle) < 0.1) {
				if (frame % 3 === 0) {
					objects.bullets.push(new Bullet({
						x: this.translate.x + 10 * Math.cos(this.angle), 
						y: this.translate.y + 10 * Math.sin(this.angle)
					}, this.angle));
				}
			}
			// killed
			if (this.target.health <= 0 || this.target.joiner) {
				this.target = null;
				this.action = 'none';
			}
		}

		this.translate.x = player.translate.x + (player.facingRight ? 2 : -2);
		this.translate.y = player.translate.y - 6;

		if (frame - this.createdFrame > 30 * 60) {
			objects.guns.splice(objects.guns.indexOf(this), 1);
		}

		nok.line(
			this.translate.x - Math.cos(this.angle), 
			this.translate.y - Math.sin(this.angle), 
			this.translate.x + 10 * Math.cos(this.angle), 
			this.translate.y + 10 * Math.sin(this.angle)
		);
	}

	findTarget() {
		var taken;
		var enemies = ['badGuy2s', 'bosses', 'badGuys'];
		for (var i = 0; i < enemies.length; i += 1) {
			for (var j = 0; j < objects[enemies[i]].length; j += 1) {
				taken = false;
				for (var k = 0; k < objects.guns.length; k += 1) {
					if (objects[enemies[i]][j] === objects.guns[k].target) {
						taken = true;
						break;
					}
				}
				if (!taken) {
					return objects[enemies[i]][j];
				}
			}
		}
		return null;
	}
}
