import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { crimesTempo } from '../data/mockData';

const GraficoCrimes = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-ceara-blue mb-4">
        📊 Evolução Temporal dos Crimes
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={crimesTempo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="homicidios" 
            stroke="#dc2626" 
            strokeWidth={3}
            name="Homicídios"
          />
          <Line 
            type="monotone" 
            dataKey="latrocinios" 
            stroke="#f59e0b" 
            strokeWidth={3}
            name="Latrocínios"
          />
          <Line 
            type="monotone" 
            dataKey="lesoes" 
            stroke="#00A651" 
            strokeWidth={3}
            name="Lesões Corporais"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCrimes;