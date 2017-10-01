function Line(startX, startY) {
	this.startPoint = new Point(startX, startY);
	this.endPoint = this.startPoint;
	this.closed = false;
	this.offset = 0;

	this.addPoint = function(x, y) {
		var point = new Point(x, y);

		this.endPoint.next = point;
		this.endPoint = this.endPoint.next;
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

	this.isClosed = function() {
		if (this.closed)
			return true;

		return false;
	}

	this.setClosed = function(value) {
		this.closed = value;
	}
}