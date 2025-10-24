import React from 'react';
import { cearaMunicipios } from '../data/mockData';

const Estatisticas = () => {
  const totalCrimes = cearaMunicipios.reduce((acc, m) => acc + m.crimes, 0);
  const totalPopulacao = cearaMunicipios.reduce((acc, m) => acc + m.populacao, 0);
  const taxaGeral = (totalCrimes / totalPopulacao) * 100000;

  const stats = [
    { 
      titulo: "Total de Crimes", 
      valor: totalCrimes.toLocaleString(), 
      icone: "🚨",
      cor: "bg-red-100 text-red-800"
    },
    { 
      titulo: "Taxa por 100k hab", 
      valor: taxaGeral.toFixed(1), 
      icone: "📈",
      cor: "bg-ceara-green bg-opacity-20 text-ceara-blue"
    },
    { 
      titulo: "Municípios Monitorados", 
      valor: cearaMunicipios.length, 
      icone: "🏙️",
      cor: "bg-blue-100 text-blue-800"
    },
    { 
      titulo: "Risco Estimado", 
      valor: taxaGeral > 40 ? "Alto" : taxaGeral > 25 ? "Médio" : "Baixo", 
      icone: "⚠️",
      cor: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ceara-gray">{stat.titulo}</p>
              <p className="text-2xl font-bold text-ceara-blue">{stat.valor}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.cor}`}>
              <span className="text-2xl">{stat.icone}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Estatisticas;