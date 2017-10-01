function Energy_Graph() {
    this.canvasElement   = null;
    this.canvasContext   = null;
    this.canvasWidth     = 425;
    this.canvasHeight    = 75;
    this.graphXdelta     = 0.0;
    this.graphYscale     = 0.0;
    this.graphCurrentPos = 0.0;
    this.isSupported     = false;
    this.alreadyCreated  = false;

    this.Initialize = function(width, height) {
        this.graphXdelta = this.canvasWidth / width;
        this.graphYscale = this.canvasHeight / height;
        this.graphCurrentPos = 0.0;
        
        if (this.alreadyCreated) {
            document.getElementById('viewport-energy').innerHTML = '';
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
        
        this.canvasContext.bo
        this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        this.canvasContext.lineWidth = 4;
        this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
        this.canvasContext.moveTo(0, this.canvasHeight);
        document.getElementById('viewport-energy').appendChild(this.canvasElement);
        this.isSupported = true;
        this.alreadyCreated = true;
    }

    this.DrawPoint = function(value) {
        if (this.isSupported) {
            this.canvasContext.lineTo(this.graphCurrentPos, this.canvasHeight - (value * this.graphYscale));
            this.canvasContext.stroke();
            this.graphCurrentPos = this.graphCurrentPos + this.graphXdelta;   
        }        
    }
}