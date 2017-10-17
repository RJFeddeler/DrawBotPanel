"use strict";

class SimulatedAnnealing {
    constructor(coolingFactor, stabilizingFactor, freezingTemperature, startTemperature, startStabilizer) {
        this.coolingFactor            = coolingFactor;
        this.stabilizingFactor        = stabilizingFactor;
        this.freezingTemperature      = freezingTemperature;
        this.currentSystemTemperature = startTemperature;
        this.currentStabilizer        = startStabilizer;
        this.currentSystemEnergy      = 0.0;
    }

    probabilityFunction(temperature, delta) {
        if (delta < 0)
            return true;

        var C = Math.exp(-delta / temperature);
        var R = Math.random();

        if (R < C)
            return true;

        return false;
    }

    step() {
        if (this.currentSystemTemperature > this.freezingTemperature) {
            for (var i = 0; i < this.currentStabilizer; i++) {
                var newEnergy = generateNeighbor();
                var energyDelta = newEnergy - this.currentSystemEnergy;

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