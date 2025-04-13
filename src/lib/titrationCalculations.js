/**
 * Acid-Base Titration Calculator for Chemistry Applications
 * 
 * This module provides functions to calculate pH values during the titration
 * of a strong base (NaOH) with a strong acid (HCl) at various concentrations.
 */

// Constants
const KW = 1.0e-14; // Water dissociation constant at 25°C

/**
 * Calculates pH values during titration of a strong base with a strong acid
 * @param {number} baseVolume - Initial volume of the base in mL
 * @param {number} baseConcentration - Concentration of the base in mol/L
 * @param {number} acidConcentration - Concentration of the acid in mol/L
 * @param {number} maxAcidVolume - Maximum volume of acid to add in mL
 * @param {number} stepSize - Volume increment between calculations (smaller = more detailed curve)
 * @returns {Object} Data object containing titration curve points and equivalence point volume
 */
export function calculateStrongBaseStrongAcidTitration(
  baseVolume, 
  baseConcentration, 
  acidConcentration, 
  maxAcidVolume,
  stepSize = 0.5
) {
  // Calculate initial moles of base
  const initialMolesBase = baseVolume * baseConcentration / 1000; // Convert to moles
  
  // Calculate volume of acid needed to reach equivalence point
  const equivalencePointVolume = initialMolesBase * 1000 / acidConcentration;
  
  // Create data array for plotting
  const data = [];
  
  // Adjust step size for better resolution around equivalence point
  const getStepSize = (acidVolume) => {
    return Math.abs(acidVolume - equivalencePointVolume) < 5 ? Math.min(stepSize, 0.1) : stepSize;
  };
  
  // Calculate points along the titration curve
  for (let acidVolume = 0; acidVolume <= maxAcidVolume;) {
    const molesAcid = acidVolume * acidConcentration / 1000;
    const totalVolume = baseVolume + acidVolume;
    
    let pH;
    
    if (molesAcid < initialMolesBase) {
      // Before equivalence point: Excess OH-
      const excessMolesBase = initialMolesBase - molesAcid;
      const ohConcentration = excessMolesBase / (totalVolume / 1000);
      const hConcentration = KW / ohConcentration;
      pH = -Math.log10(hConcentration);
    } else if (Math.abs(molesAcid - initialMolesBase) < 1.0e-10) {
      // At equivalence point: pH = 7 for strong acid-strong base
      pH = 7;
    } else {
      // After equivalence point: Excess H+
      const excessMolesAcid = molesAcid - initialMolesBase;
      const hConcentration = excessMolesAcid / (totalVolume / 1000);
      pH = -Math.log10(hConcentration);
    }
    
    // Handle extreme pH values for better visualization
    if (pH > 14) pH = 14;
    if (pH < 0) pH = 0;
    
    // Add data point
    data.push({
      volume: acidVolume,
      pH: pH,
      totalVolume: totalVolume
    });
    
    // Increment volume with adaptive step size
    acidVolume += getStepSize(acidVolume);
  }
  
  return {
    data: data,
    equivalencePoint: equivalencePointVolume,
    initialMolesBase: initialMolesBase
  };
}

/**
 * Returns predefined titration scenarios for the application
 * @returns {Object} Object containing data for all three titration scenarios
 */
export function getTitrationScenarios() {
  // Define scenario parameters
  const scenarios = {
    scenario1: {
      id: "scenario1",
      title: "Titration of 50 mL of 6M NaOH with 6M HCl",
      description: "Equal concentrations of acid and base",
      baseVolume: 50,
      baseConcentration: 6,
      acidConcentration: 6,
      maxAcidVolume: 100
    },
    scenario2: {
      id: "scenario2",
      title: "Titration of 50 mL of 3M NaOH with 6M HCl",
      description: "Acid concentration twice the base concentration",
      baseVolume: 50,
      baseConcentration: 3,
      acidConcentration: 6,
      maxAcidVolume: 50
    },
    scenario3: {
      id: "scenario3",
      title: "Titration of 50 mL of 6M NaOH with 3M HCl",
      description: "Base concentration twice the acid concentration",
      baseVolume: 50,
      baseConcentration: 6,
      acidConcentration: 3,
      maxAcidVolume: 120
    }
  };

  return scenarios;
}

/**
 * Calculates the titration data for a given scenario
 * @param {string} scenarioId - ID of the scenario to calculate
 * @returns {Object} Calculated titration data for the scenario
 */
export function calculateTitrationForScenario(scenarioId) {
  const scenarios = getTitrationScenarios();
  const scenario = scenarios[scenarioId];
  
  if (!scenario) {
    throw new Error(`Scenario with ID ${scenarioId} not found`);
  }
  
  const titrationData = calculateStrongBaseStrongAcidTitration(
    scenario.baseVolume,
    scenario.baseConcentration,
    scenario.acidConcentration,
    scenario.maxAcidVolume
  );
  
  return {
    ...scenario,
    ...titrationData
  };
}

/**
 * Retrieves all titration scenarios with their calculated data
 * @returns {Object} All scenarios with their calculated titration data
 */
export function getAllTitrationScenarios() {
  const scenarios = getTitrationScenarios();
  const scenariosWithData = {};
  
  Object.keys(scenarios).forEach(scenarioId => {
    scenariosWithData[scenarioId] = calculateTitrationForScenario(scenarioId);
  });
  
  return scenariosWithData;
}