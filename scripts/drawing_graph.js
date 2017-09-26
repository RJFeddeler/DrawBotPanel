var Drawing_Graph = (function () {
    var canvasElement   = null,
        canvasContext   = null,
        canvasWidth     = 425,
        canvasHeight    = 325,
        graphXdelta     = 0.0,
        graphYscale     = 0.0,
        graphCurrentPos = 0.0,
        isSupported     = false
        alreadyCreated  = false;

    function _init (width, height) {
        graphXdelta = canvasWidth / width;
        graphYscale = canvasHeight / height;
        graphCurrentPos = 0.0;
        
        if (alreadyCreated) {
            document.getElementById('viewport-canvas-drawing').innerHTML = '';
            alreadyCreated = false;
        }
        
        canvasElement = document.createElement('canvas');
        
        if (canvasElement.getContext) {
            canvasContext = canvasElement.getContext('2d');
        }
        else {
            return;
        }
        
        canvasElement.setAttribute('width', canvasWidth);
        canvasElement.setAttribute('height', canvasHeight);
        canvasElement.setAttribute('class', 'bordered');
        
        canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        canvasContext.fillStyle = 'rgb(255, 255, 255)';
        /*canvasContext.moveTo(0, canvasHeight);*/
        canvasContext.moveTo(0, 0);
        document.getElementById('viewport-canvas-drawing').appendChild(canvasElement);
        isSupported = true;
        alreadyCreated = true;
    }

    function _drawPoint (value) {
        if (isSupported) {
            canvasContext.lineTo(graphCurrentPos, canvasHeight - (value * graphYscale));
            canvasContext.stroke();
            graphCurrentPos = graphCurrentPos + graphXdelta;   
        }        
    }

    return {
        Initialize: function (width, height) {
            _init(width, height);
        },

        Point: function (value) {
            _drawPoint(value);
        }
    };
})();