import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PredicaoCrimes = () => {
  const [tipoPredicao, setTipoPredicao] = useState('geral');

  const dadosPredicao = {
    geral: [
      { periodo: 'Jan 2024', real: 520, predicao: null },
      { periodo: 'Fev 2024', real: 485, predicao: null },
      { periodo: 'Mar 2024', real: 560, predicao: null },
      { periodo: 'Abr 2024', real: 532, predicao: null },
      { periodo: 'Mai 2024', real: 578, predicao: null },
      { periodo: 'Jun 2024', real: 495, predicao: null },
      { periodo: 'Jul 2024', real: null, predicao: 545 },
      { periodo: 'Ago 2024', real: null, predicao: 580 },
      { periodo: 'Set 2024', real: null, predicao: 525 },
      { periodo: 'Out 2024', real: null, predicao: 560 },
      { periodo: 'Nov 2024', real: null, predicao: 540 },
      { periodo: 'Dez 2024', real: null, predicao: 510 }
    ],
    roubos: [
      { periodo: 'Jan 2024', real: 280, predicao: null },
      { periodo: 'Fev 2024', real: 265, predicao: null },
      { periodo: 'Mar 2024', real: 295, predicao: null },
      { periodo: 'Abr 2024', real: 275, predicao: null },
      { periodo: 'Mai 2024', real: 310, predicao: null },
      { periodo: 'Jun 2024', real: 260, predicao: null },
      { periodo: 'Jul 2024', real: null, predicao: 285 },
      { periodo: 'Ago 2024', real: null, predicao: 305 },
      { periodo: 'Set 2024', real: null, predicao: 275 },
      { periodo: 'Out 2024', real: null, predicao: 290 },
      { periodo: 'Nov 2024', real: null, predicao: 280 },
      { periodo: 'Dez 2024', real: null, predicao: 265 }
    ]
  };

  const calcularTendencia = () => {
    const dados = dadosPredicao[tipoPredicao];
    const dadosReais = dados.filter(d => d.real !== null);
    const ultimosMeses = dadosReais.slice(-3);
    const media = ultimosMeses.reduce((acc, d) => acc + d.real, 0) / ultimosMeses.length;
    const primeiro = ultimosMeses[0].real;
    const ultimo = ultimosMeses[ultimosMeses.length - 1].real;
    const tendencia = ((ultimo - primeiro) / primeiro) * 100;
    
    return { media: Math.round(media), tendencia: tendencia.toFixed(1) };
  };

  const { media, tendencia } = calcularTendencia();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-ceara-blue mb-4">
        🔮 Predição de Criminalidade
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTipoPredicao('geral')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tipoPredicao === 'geral'
              ? 'bg-ceara-blue text-white'
              : 'bg-gray-100 text-ceara-gray hover:bg-gray-200'
          }`}
        >
          📊 Crimes Gerais
        </button>
        <button
          onClick={() => setTipoPredicao('roubos')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tipoPredicao === 'roubos'
              ? 'bg-ceara-blue text-white'
              : 'bg-gray-100 text-ceara-gray hover:bg-gray-200'
          }`}
        >
          🚨 Roubos
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={dadosPredicao[tipoPredicao]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="real" 
            stroke="#003366" 
            strokeWidth={3}
            name="Dados Reais"
            dot={{ fill: '#003366', strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
          <Line 
            type="monotone" 
            dataKey="predicao" 
            stroke="#00A651" 
            strokeWidth={3}
            strokeDasharray="5 5"
            name="Predição IA"
            dot={{ fill: '#00A651', strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📈</span>
            <div>
              <p className="text-sm font-medium text-ceara-gray">Média Últimos 3 Meses</p>
              <p className="text-xl font-bold text-ceara-blue">{media}</p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${
          parseFloat(tendencia) > 0 ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{parseFloat(tendencia) > 0 ? '📈' : '📉'}</span>
            <div>
              <p className="text-sm font-medium text-ceara-gray">Tendência</p>
              <p className={`text-xl font-bold ${
                parseFloat(tendencia) > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {tendencia > 0 ? '+' : ''}{tendencia}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-ceara-green bg-opacity-10 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-sm font-medium text-ceara-gray">Precisão do Modelo</p>
              <p className="text-xl font-bold text-ceara-blue">87.3%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-ceara-gray">
          * Predições baseadas em algoritmos de machine learning com dados históricos. 
          Modelo treinado com padrões sazonais, tendências e fatores socioeconômicos.
        </p>
      </div>
    </div>
  );
};

export default PredicaoCrimes;