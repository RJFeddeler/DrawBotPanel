function Line(startX, startY) {
	this.startPoint = new Point(startX, startY);
	this.endPoint = this.startPoint;
	this.offset = 0;

	this.addPoint = function(x, y) {
		var point = new Point(x, y);

		this.endPoint.next = point;
		this.endPoint = this.endPoint.next;
	}

	this.isLoop = function() {
		if (this.startPoint.x === this.endPoint.x) {
			if (this.startPoint.y === this.endPoint.y) {
				return true;
			}
		}

		return false;
	}

	this.getLength = function() {
		var length = 0.0;
		p = this.startPoint;

		while (p.next) {
			length += p.getDistanceToNext();
			p = p.next;
		}

		return length;
	}
}