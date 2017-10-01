function Drawing() {
    this.canvasElement   = null;
    this.canvasContext   = null;
    this.canvasWidth     = 425;
    this.canvasHeight    = 325;
    this.isSupported     = false;
    this.alreadyCreated  = false;
    this.lineStarted     = false;
    this.startX          = 0;
    this.startY          = 0;

    this.Initialize = function(width, height) {
        if (this.alreadyCreated) {
            document.getElementById('viewport-drawing').innerHTML = '';
            this.alreadyCreated = false;
        }
        
        this.canvasElement = document.createElement('canvas');
        
        if (this.canvasElement.getContext) {
            this.canvasContext = this.canvasElement.getContext('2d');
        }
        else {
            return;
        }
        
        this.canvasElement.setAttribute('width', this.canvasWidth);
        this.canvasElement.setAttribute('height', this.canvasHeight);
        
        this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        this.canvasContext.lineWidth = 2;
        this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
        this.canvasContext.moveTo(0, this.canvasHeight);
        document.getElementById('viewport-drawing').appendChild(this.canvasElement);
        this.isSupported = true;
        this.alreadyCreated = true;
    }

    this.StartLine = function(point_x, point_y) {
        if (this.isSupported) {
            if (!this.lineStarted) {
                this.lineStarted = true;
                this.startX = point_x;
                this.startY = point_y;
                this.canvasContext.moveTo(this.startX, (this.canvasHeight - this.startY));
            }
        }
    }

    this.AddLineSegment = function(point_x, point_y) {
        if (this.isSupported) {
            if (this.lineStarted) {
                this.canvasContext.lineTo(point_x, (this.canvasHeight - point_y));
                this.canvasContext.stroke();
            }
        }
    }

    this.EndLine = function(closed) {
        if (closed)
            this.AddLineSegment(this.startX, this.startY);

        this.startX = 0;
        this.startY = 0;

        this.lineStarted = false;
    }
}