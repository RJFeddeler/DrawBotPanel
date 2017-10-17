class Point {
	constructor(x, y) {
		this.x = x;
	 	this.y = y;

	 	this.next = null;
	}

 	distanceToPoint(p) {
  		if (p === null)
  			return 0.0;

  		var deltaX = this.x - p.x;
		var deltaY = this.y - p.y;

		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  	}

  	get distanceToNext() {
  		return this.distanceToPoint(this.next);
  	}
}