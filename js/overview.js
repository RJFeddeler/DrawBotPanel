'use strict';

class Overview {
    constructor(divContainerID) {
        this.divContainerID     = divContainerID;
        this.canvasElement      = null;
        this.canvasContext      = null;
        this.offscreenCanvas    = null;
        this.offscreenContext   = null;
        this.canvasWidth        = null;
        this.canvasHeight       = null;
        this.offscreenWidth     = null;
        this.offscreenHeight    = null;
        this.drawingX           = 0;
        this.drawingY           = 0;
        this.isSupported        = false;
        this.alreadyCreated     = false;

        this.UI = {
            top         : 0,
            bottom      : 1,
            left        : 2,
            right       : 3,
            connect     : 4
        }

        var minY, maxY;
        // minY = 42; // 42 pixels from bottom to center of horiz bar
        // maxY = 62; // 43 pixels from top to center of horiz bar

        setTimeout(this._init(), 100);
    }

    _init() {
        let that = this;
        if (that.alreadyCreated) {
            $(that.divContainerID).html('');
            that.alreadyCreated = false;
        }
        
        that.canvasElement = document.createElement('canvas');
        that.offscreenCanvas = document.createElement('canvas');
        
        if ((that.canvasElement.getContext) && (that.offscreenCanvas.getContext)) {
            that.canvasContext = that.canvasElement.getContext('2d');
            that.offscreenContext = that.offscreenCanvas.getContext('2d');
        }
        else
            return;

        that.canvasWidth = $(that.divContainerID).width();
        that.canvasHeight = $(that.divContainerID).height();

        if ((state.printAreaWidth > 0) && (state.printAreaWidth > 0)) {
            that.offscreenHeight = that.canvasHeight - 60;
            that.offscreenWidth = (state.printAreaWidth / state.printAreaHeight) * that.offscreenHeight;

            if (that.offscreenWidth > (that.canvasWidth - 100)) {
                that.offscreenWidth = that.canvasWidth - 100;
                that.offscreenHeight = (state.printAreaHeight / state.printAreaWidth) * that.offscreenWidth;
            }
        }
        else
            return;

        that.canvasHeight = that.offscreenHeight + 60;
        that.canvasWidth = $(that.divContainerID).width();

        if ((that.canvasWidth > $(that.divContainerID).width()) || (that.canvasHeight > $(that.divContainerID).height()))
            return;

        that.canvasElement.setAttribute('width', that.canvasWidth);
        that.canvasElement.setAttribute('height', that.canvasHeight);

        that.offscreenCanvas.setAttribute('width', that.offscreenWidth);
        that.offscreenCanvas.setAttribute('height', that.offscreenHeight);
        
        $(that.divContainerID).append(that.canvasElement);
        that.isSupported = true;
        that.alreadyCreated = true;

        that.drawingX = (that.canvasWidth - that.offscreenWidth) / 2;
        that.drawingY = (that.canvasHeight - that.offscreenHeight) / 2;

        that.canvasContext.beginPath();
        that.canvasContext.rect(0, 0, that.canvasWidth, that.canvasHeight);
        that.canvasContext.fillStyle = "#007bff";
        that.canvasContext.fill();

        that.canvasContext.shadowBlur = 10;
        that.canvasContext.shadowColor = 'black';
        that.canvasContext.shadowOffsetX = 0;
        that.canvasContext.shadowOffsetY = 0;

        that.canvasContext.beginPath();
        that.canvasContext.rect(that.drawingX, that.drawingY, that.offscreenWidth, that.offscreenHeight);
        that.canvasContext.fillStyle = 'white';
        that.canvasContext.fill();

        this.updateOverview(190, 80, 60, 120);
    }

    loadOverviewComponents() {
        let that = this;
        let imgList = [];

        imgList.push('images/ui/preview_top.png');
        imgList.push('images/ui/preview_bottom.png');
        imgList.push('images/ui/preview_left.png');
        imgList.push('images/ui/preview_right.png');
        imgList.push('images/ui/preview_connect.png');

        const ps = imgList.map((url) => new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(img);
        }));

        Promise.all(ps).then(function(images) {
            that.images = images;
        }).catch(function(e) {
            console.log("Error loading UI component [" + e + "]");
        });
    }

    updateOverview(x1, y1, x2, y2) {
        var timeTest1 = new Date();
        const offset = 20;
        const arm1Color = '#dddddd';
        const arm2Color = '#bbbbbb';
        const blur = 5;
        var ctx = this.canvasContext;
        var x, y;

        const arm_width = 20;
        const arm_height = ctx.canvas.height - offset + 8;
        const roundedEdgeDistance = 5;
        const roundedEdgeRadius = 5;
        const connectorOutsideRadius = 20;
        const connectorInsideRadius = 10;

        const arm1_xoffset = (this.canvasWidth / 2) - (this.offscreenWidth / 2) - (offset * 2);
        const arm1_yoffset = (this.canvasHeight / 2) - (this.offscreenHeight / 2) - offset - 4;
        const arm2_xoffset = this.canvasWidth - arm1_xoffset - arm_width;
        const arm2_yoffset = arm1_yoffset;

        ctx.strokeStyle = '#222222';
        ctx.fillStyle = arm1Color;
        ctx.lineWidth = 3;

        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;


        // Left Shoulder
        x = arm1_xoffset;
        y = arm1_yoffset;

        ctx.beginPath();

        ctx.moveTo(x += arm_width - roundedEdgeDistance, this.flipY(ctx, y));
        ctx.arcTo(x += roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y += roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y += (arm_height - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y += roundedEdgeDistance), x -= roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);

        ctx.lineTo(x -= (arm_width - (2 * roundedEdgeDistance)), this.flipY(ctx, y));
        ctx.arcTo(x -= roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y -= roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y -= (arm_height - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y -= roundedEdgeDistance), x += roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        


        // Left Forearm
        x = this.drawingX + (x1 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y1 / state.printAreaHeight * this.offscreenCanvas.height);

        ctx.beginPath();

        ctx.moveTo(x, this.flipY(ctx, y -= (2 * roundedEdgeDistance)));
        ctx.arc(x, this.flipY(ctx, y += (2 * roundedEdgeDistance)), (arm_width / 2), Math.PI / 2, 3 * Math.PI / 2);

        x = this.drawingX + (x1 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y1 / state.printAreaHeight * this.offscreenCanvas.height) + (arm_width / 2);

        ctx.moveTo(x, this.flipY(ctx, y));
        ctx.lineTo(x -= (arm_height - roundedEdgeDistance + (offset * 2 + 15)), this.flipY(ctx, y));
        ctx.arcTo(x -= roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y -= roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y -= (arm_width - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y -= roundedEdgeDistance), x += roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);
        ctx.lineTo(x + arm_height - roundedEdgeDistance + (offset * 2 + 15), this.flipY(ctx, y));

        ctx.stroke();
        ctx.fill();

        x = this.drawingX + (x1 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y1 / state.printAreaHeight * this.offscreenCanvas.height) + (arm_width / 2);
        ctx.beginPath();
        ctx.moveTo(x, this.flipY(ctx, y));
        ctx.lineTo(x + 2, this.flipY(ctx, y - 2));
        y -= arm_width;
        ctx.moveTo(x, this.flipY(ctx, y));
        ctx.lineTo(x + 2, this.flipY(ctx, y + 2));
        ctx.stroke();

        x = this.drawingX + (x1 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y1 / state.printAreaHeight * this.offscreenCanvas.height);
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.arc(x, this.flipY(ctx, y), (arm_width / 5), 0, Math.PI * 2);
        ctx.shadowBlur = 0;
        ctx.fill();
        ctx.shadowBlur = blur;


        // Left Elbow
        x = arm1_xoffset + (arm_width / 2);
        y = this.drawingY + (y1 / state.printAreaHeight * this.offscreenCanvas.height);

        ctx.fillStyle = '#157ffc';
        ctx.beginPath();

        ctx.arc(x, this.flipY(ctx, y), connectorOutsideRadius, 0, Math.PI * 2);
        ctx.arc(x, this.flipY(ctx, y), connectorInsideRadius, 0, Math.PI * 2);

        ctx.stroke();
        ctx.fill('evenodd');
        

        // Right Shoulder
        x = arm2_xoffset;
        y = arm2_yoffset;

        ctx.fillStyle = arm2Color;
        ctx.beginPath();

        ctx.moveTo(x += arm_width - roundedEdgeDistance, this.flipY(ctx, y));
        ctx.arcTo(x += roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y += roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y += (arm_height - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y += roundedEdgeDistance), x -= roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);

        ctx.lineTo(x -= (arm_width - (2 * roundedEdgeDistance)), this.flipY(ctx, y));
        ctx.arcTo(x -= roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y -= roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y -= (arm_height - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y -= roundedEdgeDistance), x += roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);

        ctx.closePath();

        ctx.stroke();
        ctx.fill();


        // Right Forearm
        x = this.drawingX + (x2 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y2 / state.printAreaHeight * this.offscreenCanvas.height);
        ctx.moveTo(x -= (2 * roundedEdgeDistance), this.flipY(ctx, y -= (2 * roundedEdgeDistance)));

        ctx.beginPath();

        ctx.lineTo(x+=10, this.flipY(ctx, y));
        ctx.arcTo(x += 10 , this.flipY(ctx, y), x, this.flipY(ctx, y += 10), 10);
        ctx.arcTo(x, this.flipY(ctx, y += 10), x -= 10, this.flipY(ctx, y), 10);
        
        x = this.drawingX + (x2 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y2 / state.printAreaHeight * this.offscreenCanvas.height) + (arm_width / 2);

        ctx.lineTo(x += (arm_height - roundedEdgeDistance + (offset * 2 + 15)), this.flipY(ctx, y));
        ctx.arcTo(x += roundedEdgeDistance, this.flipY(ctx, y), x, this.flipY(ctx, y -= roundedEdgeDistance), roundedEdgeRadius);

        ctx.lineTo(x, this.flipY(ctx, y -= (arm_width - (2 * roundedEdgeDistance))));
        ctx.arcTo(x, this.flipY(ctx, y -= roundedEdgeDistance), x -= roundedEdgeDistance, this.flipY(ctx, y), roundedEdgeRadius);
        ctx.lineTo(x - arm_height + roundedEdgeDistance - (offset * 2 + 15), this.flipY(ctx, y));

        ctx.stroke();
        ctx.fill();

        x = this.drawingX + (x2 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y2 / state.printAreaHeight * this.offscreenCanvas.height) + (arm_width / 2);
        ctx.beginPath();
        ctx.moveTo(x, this.flipY(ctx, y));
        ctx.lineTo(x - 2, this.flipY(ctx, y - 2));
        y -= arm_width;
        ctx.moveTo(x, this.flipY(ctx, y));
        ctx.lineTo(x - 2, this.flipY(ctx, y + 2));
        ctx.stroke();

        x = this.drawingX + (x2 / state.printAreaWidth * this.offscreenCanvas.width);
        y = this.drawingY + (y2 / state.printAreaHeight * this.offscreenCanvas.height);
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.arc(x, this.flipY(ctx, y), (arm_width / 5), 0, Math.PI * 2);
        ctx.shadowBlur = 0;
        ctx.fill();
        ctx.shadowBlur = blur;


        // Right Elbow
        x = arm2_xoffset + (arm_width / 2);
        y = this.drawingY + (y2 / state.printAreaHeight * this.offscreenCanvas.height);

        ctx.fillStyle = '#157ffc';
        ctx.beginPath();

        ctx.arc(x, this.flipY(ctx, y), connectorOutsideRadius, 0, Math.PI * 2);
        ctx.arc(x, this.flipY(ctx, y), connectorInsideRadius, 0, Math.PI * 2);

        ctx.stroke();
        ctx.fill('evenodd');


        // Border Fade
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.canvasWidth-1, 0);
        ctx.lineTo(this.canvasWidth-1, this.canvasHeight-1);
        ctx.lineTo(0, this.canvasHeight-1);
        ctx.closePath();

        ctx.shadowColor = '#007bff';
        ctx.shadowBlur = 4;
        ctx.stroke();


        var timeTest2 = new Date();
        console.log("Overview drawing took " + (timeTest2.getTime() - timeTest1.getTime()) + " milliseconds");
    }

    flipY(ctx, y) { return ctx.canvas.height - y; }

    putImage(context, x, y) {

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