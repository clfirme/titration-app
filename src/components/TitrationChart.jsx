'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Label } from 'recharts';
import { calculateTitrationForScenario } from '../lib/titrationCalculations';

/**
 * Custom tooltip component for displaying detailed point information
 */
const CustomTooltip = ({ active, payload, label, equivalencePoint }) => {
  if (active && payload && payload.length) {
    const isBeforeEquivalence = label < equivalencePoint;
    const isAtEquivalence = Math.abs(label - equivalencePoint) < 0.1;
    
    // Determine the solution state
    let solutionState = isBeforeEquivalence 
      ? "Basic solution (excess OH-)" 
      : isAtEquivalence 
        ? "Neutral at equivalence point" 
        : "Acidic solution (excess H+)";
        
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-md">
        <p className="text-sm font-semibold">Added HCl: {Number(label).toFixed(1)} mL</p>
        <p className="text-sm">pH: {payload[0].value.toFixed(2)}</p>
        <p className="text-sm text-gray-600">{solutionState}</p>
      </div>
    );
  }
  return null;
};

/**
 * Component for displaying the titration curve chart
 * 
 * @param {Object} props Component properties
 * @param {string} props.scenarioId ID of the scenario to display
 */
export default function TitrationChart({ scenarioId }) {
  const [titrationData, setTitrationData] = useState(null);
  
  // Calculate titration data whenever the scenario changes
  useEffect(() => {
    if (scenarioId) {
      const calculatedData = calculateTitrationForScenario(scenarioId);
      setTitrationData(calculatedData);
    }
  }, [scenarioId]);
  
  // If there's no data yet, show a loading state
  if (!titrationData) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-gray-500">Loading titration data...</div>
      </div>
    );
  }
  
  return (
    <div className="w-full border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{titrationData.title}</h2>
      <p className="text-gray-700 mb-4">{titrationData.description}</p>
      
      {/* The titration curve chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={titrationData.data}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="volume" 
              type="number"
              domain={[0, titrationData.maxAcidVolume]}
              tickCount={11}
            >
              <Label value="Volume of HCl Added (mL)" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis domain={[0, 14]} tickCount={8}>
              <Label value="pH" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            
            <Tooltip content={<CustomTooltip equivalencePoint={titrationData.equivalencePoint} />} />
            <Legend />
            
            {/* Reference line for equivalence point */}
            <ReferenceLine 
              x={titrationData.equivalencePoint} 
              stroke="red" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Equivalence Point", 
                position: "top", 
                fill: "red",
                fontSize: 12 
              }} 
            />
            
            {/* Reference line for neutral pH */}
            <ReferenceLine 
              y={7} 
              stroke="green" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Neutral pH (7)", 
                position: "right", 
                fill: "green",
                fontSize: 12 
              }} 
            />
            
            {/* The titration curve */}
            <Line 
              type="monotone" 
              dataKey="pH" 
              stroke="#2563eb" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6 }} 
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Reaction information */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Titration Details</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Initial solution:</span> {titrationData.baseVolume} mL of {titrationData.baseConcentration}M NaOH</p>
              <p><span className="font-medium">Titrant:</span> {titrationData.acidConcentration}M HCl</p>
              <p><span className="font-medium">Equivalence point:</span> {titrationData.equivalencePoint.toFixed(1)} mL of HCl</p>
              <p><span className="font-medium">Reaction:</span> NaOH + HCl → NaCl + H₂O</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>The titration starts at high pH (strongly basic) due to NaOH</li>
              <li>pH changes gradually until near the equivalence point</li>
              <li>At the equivalence point, pH drops sharply from basic to acidic</li>
              <li>After the equivalence point, pH continues to decrease more gradually</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}