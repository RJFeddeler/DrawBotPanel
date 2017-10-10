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
            alert("test");
            if (alreadyRunning) {
                clearInterval(intervalId);
            }

            var options = GetOptions();

            options.generateNewSolution = Drawbot.GenerateRandomPositions;
            options.generateNeighbor    = Drawbot.GenerateNeighbor;
            options.acceptNeighbor      = Drawbot.AcceptNeighbor;

            Drawing.Initialize();
            Energy_Graph.Initialize((options.initialTemperature - options.freezingTemperature) / options.coolingFactor, Constants.MAX_POSSIBLE_ATTACKS);
            SimulatedAnnealing.Initialize(options);
            Energy_Graph.Point(SimulatedAnnealing.GetCurrentEnergy());

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
});
