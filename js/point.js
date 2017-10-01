function Point(x, y) {
 	this.x = x;
 	this.y = y;
 	this.next = null;

 	this.getDistanceToPoint = function(v) {
  		if (v == null)
  			return 0.0;

  		var delta_x = this.x - v.x;
		var delta_y = this.y - v.y;

		return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
  	}

  	this.getDistanceToNext = function() {
  		return this.getDistanceToPoint(this.next);
  	}
}