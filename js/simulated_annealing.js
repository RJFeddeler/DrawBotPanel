function SimulatedAnnealing() {
    this.coolingFactor            = 0.0;
    this.stabilizingFactor        = 0.0;
    this.freezingTemperature      = 0.0;
    this.currentSystemEnergy      = 0.0;
    this.currentSystemTemperature = 0.0;
    this.currentStabilizer        = 0.0;

    this.generateNewSolution      = null;
    this.generateNeighbor         = null;
    this.acceptNeighbor           = null;

    this.Initialize = function(options) {
        this.coolingFactor            = options.coolingFactor;
        this.stabilizingFactor        = options.stabilizingFactor;
        this.freezingTemperature      = options.freezingTemperature;
        this.generateNewSolution      = options.generateNewSolution;
        this.generateNeighbor         = options.generateNeighbor;
        this.acceptNeighbor           = options.acceptNeighbor;

        this.currentSystemEnergy      = generateNewSolution();
        this.currentSystemTemperature = options.initialTemperature;
        this.currentStabilizer        = options.initialStabilizer;
    }

    this.ProbabilityFunction = function(temperature, delta) {
        if (delta < 0) {
            return true;
        }

        var C = Math.exp(-delta / temperature);
        var R = Math.random();

        if (R < C) {
            return true;
        }

        return false;
    }

    this.DoSimulationStep = function() {
        if (this.currentSystemTemperature > this.freezingTemperature) {
            for (var i = 0; i < this.currentStabilizer; i++) {
                var newEnergy = generateNeighbor(),
                    energyDelta = newEnergy - this.currentSystemEnergy;

                if (_probabilityFunction(this.currentSystemTemperature, energyDelta)) {
                    acceptNeighbor();
                    this.currentSystemEnergy = newEnergy;
                }
            }

            this.currentSystemTemperature = this.currentSystemTemperature - this.coolingFactor;
            this.currentStabilizer = this.currentStabilizer * this.stabilizingFactor;
            return false;
        }
        
        this.currentSystemTemperature = this.freezingTemperature;
        
        return true;
    }
}