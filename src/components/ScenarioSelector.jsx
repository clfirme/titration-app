'use client';

import { useState } from 'react';
import { getTitrationScenarios } from '../lib/titrationCalculations';

/**
 * Component for selecting between different titration scenarios
 * 
 * @param {Object} props Component properties
 * @param {string} props.selectedScenario Currently selected scenario ID
 * @param {Function} props.onScenarioChange Callback when scenario is changed
 */
export default function ScenarioSelector({ selectedScenario, onScenarioChange }) {
  // Get all available scenarios
  const scenarios = getTitrationScenarios();

  // Função para calcular o volume de HCl necessário para neutralização
  const calculateNeutralization = (scenario) => {
    const molesNaOH = (scenario.baseConcentration * scenario.baseVolume) / 1000; // Convertendo mL para L
    const volumeHCl = (molesNaOH / scenario.acidConcentration) * 1000; // Convertendo L para mL
    return {
      molesNaOH: molesNaOH.toFixed(3),
      volumeHCl: volumeHCl.toFixed(1)
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-lg font-semibold mb-4">Select Titration Scenario:</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(scenarios).map((scenario) => {
          const neutralization = calculateNeutralization(scenario);
          return (
            <div
              key={scenario.id}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                ${selectedScenario === scenario.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}
              `}
              onClick={() => onScenarioChange(scenario.id)}
            >
              <div className="font-medium mb-1">
                {scenario.id === 'scenario1' ? 'NaOH 6M + HCl 6M' : 
                 scenario.id === 'scenario2' ? 'NaOH 3M + HCl 6M' : 
                 'NaOH 6M + HCl 3M'}
              </div>
              <div className="text-sm text-gray-600">{scenario.description}</div>
              
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Base:</span>
                  <span>{scenario.baseConcentration}M NaOH ({scenario.baseVolume} mL)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Acid:</span>
                  <span>{scenario.acidConcentration}M HCl</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                <div className="font-medium text-blue-700 mb-1">Neutralization:</div>
                <div>
                  <div className="text-gray-600">
                    n(NaOH) = {neutralization.molesNaOH} mol
                  </div>
                  <div className="text-gray-600">
                    HCl needed: {neutralization.volumeHCl} mL
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}