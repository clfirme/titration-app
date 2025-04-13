'use client';

import { useState } from 'react';
import ScenarioSelector from '@/components/ScenarioSelector';
import TitrationChart from '@/components/TitrationChart';

export default function Home() {
  // State to track the selected scenario
  const [selectedScenario, setSelectedScenario] = useState('scenario1');
  
  // Handler for when a scenario is selected
  const handleScenarioChange = (scenarioId) => {
    setSelectedScenario(scenarioId);
  };
  
  return (
    <div className="py-6">
      {/* Introduction section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Acid-Base Titration Curves</h1>
        <p className="text-lg text-gray-700">
          Explore the pH changes during the titration of a strong base (NaOH) with a strong acid (HCl) 
          at different concentrations. Select one of the three scenarios below to view its titration curve.
        </p>
      </section>
      
      {/* Scenario selection section */}
      <ScenarioSelector 
        selectedScenario={selectedScenario} 
        onScenarioChange={handleScenarioChange} 
      />
      
      {/* Titration chart section */}
      <TitrationChart scenarioId={selectedScenario} />
      
      {/* Educational information section */}
      <section className="mt-10 bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Understanding Acid-Base Titrations</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">What Is a Titration?</h3>
            <p>
              A titration is a technique where a solution of known concentration (the titrant) is added 
              to a solution of unknown concentration until the reaction reaches its endpoint. In acid-base 
              titrations, this reaction is a neutralization between an acid and a base.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Equivalence Point</h3>
            <p>
              The equivalence point occurs when the moles of acid exactly equal the moles of base in the 
              solution. At this point, the acid and base have completely neutralized each other. For strong
              acid-strong base titrations, the pH at the equivalence point is 7 (neutral).
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Titration Curve Features</h3>
            <p>
              The titration curve shows how the pH changes as acid is added to the base solution:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <span className="font-medium">Initial plateau:</span> At the beginning, the pH changes very slowly 
                as the strong base neutralizes the added acid.
              </li>
              <li>
                <span className="font-medium">Sharp drop:</span> Near the equivalence point, the pH changes dramatically 
                with small additions of acid.
              </li>
              <li>
                <span className="font-medium">Final plateau:</span> After the equivalence point, additional acid causes 
                smaller decreases in pH.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Effect of Concentration</h3>
            <p>
              The concentration ratio between the acid and base affects where the equivalence point occurs:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>
                When the acid and base have equal concentrations, the equivalence point occurs when 
                the volume of acid added equals the initial volume of base.
              </li>
              <li>
                When the acid is more concentrated than the base, less acid is needed to reach the equivalence point.
              </li>
              <li>
                When the base is more concentrated than the acid, more acid is needed to reach the equivalence point.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
