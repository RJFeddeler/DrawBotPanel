function Drawbot() {
    //var NUM_QUEENS             	= 8,
    //    NUM_BOARD_SQUARES      	= 64,
    this.lines                  = [];
    this.currentSortOrder		= [];
    this.newSortOrder	     	= [];

	this.GenerateRandomPositions = function() {
	}

	this.CalculateAttacks = function(board) {
	}

	this.GenerateNeighbor = function() {
	}

	this.CheckRepetitions = function(board) {
	}

	this.AcceptNeighbor = function() {
	}

	this.GetCurrentPositions = function() {
	}

    this.AddPolygon = function(points) {
        for (i = 0; i < points.length; i++)
            points[i] = points[i].replace(/ /g,'');

        var start = points.indexOf('START');
        var line = new Line(points[start+1], points[start+2]);

        for (i = start+3; i < points.length - 2; i+=2) {
            line.addPoint(points[i], points[i+1]);
        }

        line.setClosed(true);
        this.lines.push(line);
    }

    this.DrawLines = function(drawingCanvas) {
        this.lines.forEach(function(line) {
            var currentPoint = line.startPoint.next;
            drawingCanvas.StartLine(line.startPoint.x, line.startPoint.y);


            while (currentPoint) {
                drawingCanvas.AddLineSegment(currentPoint.x, currentPoint.y);
                currentPoint = currentPoint.next;
            }
            
            drawingCanvas.EndLine(line.isClosed());
        });
    }
}