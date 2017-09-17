var App = (function () {
    var intervalId     = 0,
        alreadyRunning = false;

    function GetOptions () {
        return {
            initialTemperature:  parseFloat(document.getElementById('initial_temperature').value),
            initialStabilizer:   parseFloat(document.getElementById('initial_stabilizer').value),
            coolingFactor:       parseFloat(document.getElementById('cooling_factor').value),
            stabilizingFactor:   parseFloat(document.getElementById('stabilizing_factor').value),
            freezingTemperature: parseFloat(document.getElementById('freezing_temperature').value)
        };
    }

    return {
        Start: function() {
            if (alreadyRunning) {
                clearInterval(intervalId);
            }

            var options = GetOptions();

            options.generateNewSolution = Queens.GenerateRandomPositions;
            options.generateNeighbor    = Queens.GenerateNeighbor;
            options.acceptNeighbor      = Queens.AcceptNeighbor;

            Draw.Initialize();
            Graph.Initialize((options.initialTemperature - options.freezingTemperature) / options.coolingFactor, Constants.MAX_POSSIBLE_ATTACKS);
            Console.Initialize();
            SimulatedAnnealing.Initialize(options);
            Draw.DrawBoard(Queens.GetCurrentPositions());
            Console.Print('System energy: ', SimulatedAnnealing.GetCurrentEnergy());
            Graph.Point(SimulatedAnnealing.GetCurrentEnergy());

            var lines = [];

            for (i = 0; i < 10; i++) {
                lines[i] = new Line((i * 2) + 1, (i * 2) + 1);
                lines[i].addPoint((i * 2) + 2, (i * 2) + 1);
                lines[i].addPoint((i * 2) + 2, (i * 2) + 2);
                lines[i].addPoint((i * 2) + 1, (i * 2) + 2);
                lines[i].addPoint((i * 2) + 1, (i * 2) + 1);
            }

            var linesLength = 0.0;

            for (i = 0; i < lines.length; i++) {
                linesLength += lines[i].getLength();
            }

            intervalId = setInterval(function () {
                var done = SimulatedAnnealing.Step();
                Draw.DrawBoard(Queens.GetCurrentPositions());
                Console.Print('System energy: ', SimulatedAnnealing.GetCurrentEnergy(),
                              '&nbsp;&nbsp;&nbsp;',
                              'System temperature:', SimulatedAnnealing.GetCurrentTemperature(),
                              '&nbsp;&nbsp;&nbsp;',
                              'Line Length:', linesLength);
                Graph.Point(SimulatedAnnealing.GetCurrentEnergy());

                if (done === true) {
                    clearInterval(intervalId);
                    alreadyRunning = false;
                }

            }, 50);

            alreadyRunning = true;
        }
    };
})();
