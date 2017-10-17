function traceCanvas(imgData) {
	var startDate = new Date();
	var seen = [];
	var lines = [];

	var neighbor = [ 	{ x: 0, y: -1 }, // N
						{ x: 1, y: -1 }, // NE
						{ x: 1, y: 0 }, // E
						{ x: 1, y: 1 }, // SE
						{ x: 0, y: 1 }, // S
						{ x: -1, y: 1 }, // SW
						{ x: -1, y: 0 }, // W
						{ x: -1, y: -1 } // NW
					];

	var neighborOrder = [	[ 0, 1, 7, 2, 6, 3, 5, 4 ],
							[ 1, 2, 0, 3, 7, 4, 6, 5 ],
							[ 2, 3, 1, 4, 0, 5, 7, 6 ],
							[ 3, 4, 2, 5, 1, 6, 0, 7 ],
							[ 4, 5, 3, 6, 2, 7, 1, 0 ],
							[ 5, 6, 4, 7, 3, 0, 2, 1 ],
							[ 6, 7, 5, 0, 4, 1, 3, 2 ],
							[ 7, 0, 6, 1, 5, 2, 4, 3 ]
	 					];

	var newDirection = [ 	[ 7, 6, 5 ],
							[ 0, -1, 4 ],
							[ 1, 2, 3 ]
						];


	console.log("Starting Trace");

	// STARTING X AND Y AT 1 AND -1 FOR MAX TO AVOID BORDER
	var x, y;
	for (y = 1; y < imgData.height - 1; y++) {
		for (x = 1; x < imgData.width - 1; x++) {
			if (checkTimeout())
				return;

			if ((partOfALine(x, y)) && (!seenThis(x, y))) {
				seen.push({ x: x, y: y});

				var line = [{ x: x, y: y }];
				line = line.concat(traverse(x, y));
				lines.push(line);
			}
		}
	}

	var i, j;
	var radius = 3;
	var match = false;
	for (i = 0; i < lines.length; i++) {
		for (j = i + 1; j < lines.length; j++) {
			match = false;
			if (areNeighbors(lines[i][lines[i].length-1], lines[j][0], radius)) {
				lines[i] = lines[i].concat(lines[j]);
				match = true;
			}
			else if (areNeighbors(lines[i][0], lines[j][lines[j].length-1], radius)) {
				lines[i] = lines[j].concat(lines[i]);
				match = true;
			}
			else if (areNeighbors(lines[i][0], lines[j][0], radius)) {
				lines[i] = reverseLine(lines[i]);
				lines[i] = lines[i].concat(lines[j]);
				match = true;
			}
			else if (areNeighbors(lines[i][lines[i].length-1], lines[j][lines[j].length-1], radius)) {
				lines[j] = reverseLine(lines[j]);
				lines[i] = lines[i].concat(lines[j]);
				match = true;
			}

			if (match) {
				lines.splice(j, 1);
				i--;
				break;
			}
		}
	}

	findStraightPaths();
	removeSmallLines(3);
	douglasPeucker();
	console.log("Finished Trace");
	printLines();


	function seenThis(x, y) {
		var i = 0;
		for (i = 0; i < seen.length; i++) {
			if (seen[i].x === x && seen[i].y === y) {
				return true;
			}
		}

		return false;
	}

	function traverse(x, y) {
		return traverseDir(x, y, 3);
	}

	function traverseDir(x, y, dir) {
		if (checkTimeout())
			return;

		var line = [];
		var offsetX, offsetY;

		var i = 0;
		for (i = 0; i < 8; i++) {
			offsetX = neighbor[neighborOrder[dir][i]].x;
			offsetY = neighbor[neighborOrder[dir][i]].y;

			if ((x + offsetX < 0) || (x + offsetX >= imgData.width) || (y + offsetY < 0) || (y + offsetY >= imgData.height))
				continue;

			if ((partOfALine(x + offsetX, y + offsetY)) && (!seenThis(x + offsetX, y + offsetY))) {
				line.push({x: (x + offsetX), y: (y + offsetY)});
				seen.push({x: (x + offsetX), y: (y + offsetY)});

				line = line.concat(traverseDir(x + offsetX, y + offsetY, newDirection[offsetX + 1][offsetY + 1]));
				return line;
			}
		}

		return [];

	}

	function partOfALine(x, y) {
		var start = (y * (imgData.width * 4)) + (x * 4);
		var pixel = { r:imgData.data[start], g:imgData.data[start + 1], b:imgData.data[start + 2], a:imgData.data[start + 3] };
		var lineColor = { r: 0, g: 0, b: 0 };

		if (pixel.r === lineColor.r && pixel.g === lineColor.g && pixel.b === lineColor.b)
			return true;
		else
			return false;
	}

	function areNeighbors(point1, point2, radius) {
		for (var r = 1; r <= radius; r++) {
			for (var i = 0; i < neighbor.length; i++) {
				if ((point1.x === (point2.x + neighbor[i].x * r)) && (point1.y === (point2.y + neighbor[i].y * r))) {
					return true;
				}
			}
		}

		return false;
	}

	function reverseLine(line) {
		var i, newLine = [];

		for (i = line.length - 1; i >= 0; i--)
			newLine.push(line[i]);

		return newLine;
	}

	function findStraightPaths() {
		if (lines.length < 2)
			return;

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].length < 2) continue;

			var start = { loc: 0, x: (lines[i][1].x - lines[i][0].x), y: (lines[i][1].y - lines[i][0].y) };
			for (var j = 1; j < lines[i].length-1; j++) {
				var end = { loc: j, x: (lines[i][j+1].x - lines[i][j].x), y: (lines[i][j+1].y - lines[i][j].y) };

				if ((start.x !== end.x) || (start.y !== end.y)) {
					if (end.loc - start.loc > 1)
						lines[i].splice(start.loc + 1, end.loc - start.loc - 1);

					start = { loc: end.loc, x: end.x, y: end.y };
				}
			}

			if (end.loc - start.loc > 1)
				lines[i].splice(start.loc + 1, end.loc - start.loc);
		}
	}

	function removeSmallLines(minimum) {
		for (var i = 0; i < lines.length; i++) {
			if ((lines[i].length < 2) || (lineLength(lines[i]) < minimum)) {
				lines.splice(i--, 1);
			}
		}
	}

	function douglasPeucker() {
		for (var i = 0; i < lines.length; i++) {
			var epsilon = lineLength(lines[i]) * 0.02;
			douglasPeuckerSub(lines[i], 0, lines[i].length - 1, epsilon);
		}
	}

	function douglasPeuckerSub(line, start, end, epsilon) {
		//console.log("LENGTH: " + line.length + ", START: " + start + ", END: " + end);
		var dmax = 0
	    var index = 0
	    for (var i = start + 1; i <= end - 1; i++) {
	        var d = perpendicularDistance(line[i], line[start], line[end]); 
	        if (d > dmax) {
	            index = i;
	            dmax = d;
	        }
	    }

	    if (dmax > epsilon) {
	    	var result2 = douglasPeuckerSub(line, index, end, epsilon);
	    	var result1 = douglasPeuckerSub(line, start, index, epsilon);
	    	
	    	return result1.concat(result2);
	    } 
	    else {
	    	return line.splice(start + 1, end - start - 1);
	    }
	}

	function perpendicularDistance(pointP, linePoint1, linePoint2) {
		var area = Math.abs(0.5 * (linePoint1.x * linePoint2.y + linePoint2.x * pointP.y + pointP.x * linePoint1.y - linePoint2.x * linePoint1.y - pointP.x * linePoint2.y - linePoint1.x * pointP.y));
		var bottom = Math.sqrt(Math.pow(linePoint1.x - linePoint2.x, 2) + Math.pow(linePoint1.y - linePoint2.y, 2));
		var height = area / bottom * 2.0;

		return height;
	}

	function lineLength(line) {
		var length = 0;
		for (var i = 0; i < line.length - 1; i++) {
			d1 = line[i + 1].x - line[i].x;
			d2 = line[i + 1].y - line[i].y;
			length += Math.sqrt(d1 * d1 + d2 * d2);
		}

		return length;
	}

	function printLines() {
		console.log("Lines found:")

		var maxX = maxY = 0;
		var i, j, str;
		for (i = 0; i < lines.length; i++) {
			str = 'C11, START, ';
			for (j = 0; j < lines[i].length; j++) {
				if (lines[i][j].x > maxX)
					maxX = lines[i][j].x;
				if (lines[i][j].y > maxY)
					maxY = lines[i][j].y;

				str += lines[i][j].x + ', ' + lines[i][j].y
				if (j < lines[i].length - 1)
					str += " , ";
			}
			//console.log(str + ", STOP");
		}
		console.log("Max X: " + maxX + ", Max Y: " + maxY);



		console.log("Lines found:")
		var i, j, str;
		for (i = 0; i < lines.length; i++) {
			str = 'C11, START, ';
			for (j = 0; j < lines[i].length; j++) {
				str += lines[i][j].x + ', ' + (maxY - lines[i][j].y)
				if (j < lines[i].length - 1)
					str += " , ";
			}
			console.log(str + ", STOP");
		}
	}

	function checkTimeout() {
		var curDate =  new Date();
		var seconds = (curDate.getTime() - startDate.getTime()) / 1000;

		return (seconds > 60) ? true : false;
	}
}