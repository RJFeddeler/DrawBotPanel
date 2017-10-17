class Preview {
    constructor(divContainerID, width, height) {
        this.canvasElement   = null;
        this.canvasContext   = null;
        this.canvasWidth     = width;
        this.canvasHeight    = height;
        this.isSupported     = false;
        this.alreadyCreated  = false;
        this.lineStarted     = false;

        if (this.alreadyCreated) {
            document.getElementById(divContainerID).innerHTML = '';
            this.alreadyCreated = false;
        }
        
        this.canvasElement = document.createElement('canvas');
        
        if (this.canvasElement.getContext)
            this.canvasContext = this.canvasElement.getContext('2d');
        else
            return;
        
        this.canvasElement.setAttribute('width', this.canvasWidth);
        this.canvasElement.setAttribute('height', this.canvasHeight);
        
        this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        this.canvasContext.lineWidth = 1;
        //this.canvasContext.translate(0.5, 0.5); // Used to get a line width of 1
        this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
        this.canvasContext.moveTo(0, this.canvasHeight);
        document.getElementById(divContainerID).appendChild(this.canvasElement);
        this.isSupported = true;
        this.alreadyCreated = true;
    }

    drawLine(line) {
        var currentPoint;
        
        if (this.isSupported) {
            if (!this.lineStarted) {
                this.lineStarted = true;
                this.canvasContext.moveTo(line.startPoint.x, (this.canvasHeight - line.startPoint.y));
            }
        }

        currentPoint = line.startPoint.next;
        while (currentPoint) {
            this.addLineSegment(currentPoint.x, currentPoint.y);
            currentPoint = currentPoint.next;
        }

        if (line.getClosed())
            this.addLineSegment(line.startPoint.x, line.startPoint.y);

        this.lineStarted = false;
    }

    addLineSegment(point_x, point_y) {
        if (this.isSupported) {
            if (this.lineStarted) {
                this.canvasContext.lineTo(point_x, (this.canvasHeight - point_y));
                this.canvasContext.stroke();
            }
        }
    }
}