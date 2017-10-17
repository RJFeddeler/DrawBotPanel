"use strict";

class App {
    constructor() {
        this.intervalId         = 0;
        this.alreadyRunning     = false;
        this.lines              = [];

        this.xScale             = 1.0;
        this.yScale             = 1.0;
    }

    start() {
        if (this.alreadyRunning)
            clearInterval(this.intervalId);

        //Energy_Graph.Initialize((options.initialTemperature - options.freezingTemperature) / options.coolingFactor, Constants.MAX_POSSIBLE_ATTACKS);
        var anneal = new SimulatedAnnealing(this.options.coolingFactor, this.options.stabilizingFactor, this.options.freezingTemperature, this.options.initialTemperature, this.options.initialStabilizer);

        this.intervalId = setInterval(function () {
            var done = false; //anneal.Step();
            //Draw.DrawBoard(GetCurrentPositions());
            //Graph.Point(anneal.GetCurrentEnergy());
            
            if (done === true) {
                clearInterval(this.intervalId);
                this.alreadyRunning = false;
            }

        }, 50);

        this.alreadyRunning = true;
    }

    get options() {
        return {
            initialTemperature:  parseFloat(document.getElementById('initial_temperature').value),
            initialStabilizer:   parseFloat(document.getElementById('initial_stabilizer').value),
            coolingFactor:       parseFloat(document.getElementById('cooling_factor').value),
            stabilizingFactor:   parseFloat(document.getElementById('stabilizing_factor').value),
            freezingTemperature: parseFloat(document.getElementById('freezing_temperature').value)
        };
    }

    GenerateRandomPositions() {
    }

    CalculateAttacks(board) {
    }

    GenerateNeighbor() {
    }

    CheckRepetitions(board) {
    }

    AcceptNeighbor() {
    }

    GetCurrentPositions() {
    }

    addLineList(points, closed = false) {
        for (i = 0; i < points.length; i++)
            points[i] = trimStr(points[i]);

        var start = points.indexOf('START');
        var line = new Line(points[start+1], points[start+2]);

        for (i = start+3; i < points.length - 2; i+=2) {
            line.addPoint(points[i], points[i+1]);
        }

        line.setClosed(closed);
        this.lines.push(line);
    };

    addPolygon(points) {
        addLineList(points, true);
    };

    findLineScale() {

    }

    drawLines() {
        this.lines.forEach(function(line) {
            preview.drawLine(line);
        });
    };
}

function trimStr(text) {
    return text.replace(/ /g,'');
}