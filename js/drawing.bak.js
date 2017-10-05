var Drawing = (function () {
    var canvasElement   = null,
        canvasContext   = null,
        canvasWidth     = 425,
        canvasHeight    = 325,
        isSupported     = false,
        alreadyCreated  = false;
        lineStarted     = false;

    function _init (width, height) {
        if (alreadyCreated) {
            document.getElementById('viewport-drawing').innerHTML = '';
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
        canvasContext.moveTo(0, canvasHeight);
        document.getElementById('viewport-drawing').appendChild(canvasElement);
        isSupported = true;
        alreadyCreated = true;
    }

    function _startLine (point_x, point_y) {
        if (isSupported) {
            if (!lineStarted) {
                this.lineStarted = true;
                canvasContext.moveTo(point_x, (canvasHeight - point_y));
            }
        }
    }

    function _addLineSegment(point_x, point_y) {
        if (isSupported) {
            if (lineStarted) {
                canvasContext.lineTo(point_x, (canvasHeight - point_y));
                canvasContext.stroke();
            }
        }
    }

    function _endLine() {
        this.lineStarted = false;
    }

    return {
        Initialize: function (width, height) {
            _init(width, height);
        },

        StartLine: function (point_x, point_y) {
            _startLine(point_x, point_y);
        },

        AddLineSegment: function(point_x, point_y) {
            _addLineSegment(point_x, point_y);
        },

        EndLine: function() {
            _endLine();
        }
    };
});