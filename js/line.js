class Line {
	constructor(x, y) {
		this.startPoint = new Point(x, y);
		this.endPoint = this.startPoint;
		this.closed = false;
	}

	addPoint(x, y) {
		var p = new Point(x, y);

		this.endPoint.next = p;
		this.endPoint = this.endPoint.next;
	}

	get length() {
		var length = 0.0;
		p = this.startPoint;

		while (p.next) {
			length += p.distanceToNext;
			p = p.next;
		}

		return length;
	}

	getClosed() {
		return this.closed;
	}

	setClosed(value) {
		this.closed = value;
	}
}