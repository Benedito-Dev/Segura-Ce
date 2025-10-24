import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { crimesTempo, crimesHorario } from '../data/mockData';

const GraficosAvancados = () => {
  const [graficoAtivo, setGraficoAtivo] = useState('evolucao');

  const dadosPizza = [
    { name: 'Roubos', value: 45, color: '#dc2626' },
    { name: 'Furtos', value: 30, color: '#f59e0b' },
    { name: 'Homicídios', value: 15, color: '#7c2d12' },
    { name: 'Lesões', value: 10, color: '#00A651' }
  ];

  const renderGrafico = () => {
    switch(graficoAtivo) {
      case 'evolucao':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={crimesTempo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="roubos" 
                stackId="1"
                stroke="#dc2626" 
                fill="#dc2626"
                fillOpacity={0.6}
                name="Roubos"
              />
              <Area 
                type="monotone" 
                dataKey="furtos" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Furtos"
              />
              <Area 
                type="monotone" 
                dataKey="lesoes" 
                stackId="1"
                stroke="#00A651" 
                fill="#00A651"
                fillOpacity={0.6}
                name="Lesões"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'horario':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={crimesHorario}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="crimes" 
                fill="#003366"
                name="Crimes por Hora"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'distribuicao':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dadosPizza}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {dadosPizza.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'tendencia':
        return (
          <ResponsiveContainer width="100%" height={400}>
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
                dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="latrocinios" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Latrocínios"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const opcoes = [
    { id: 'evolucao', nome: 'Evolução Anual', icone: '📈' },
    { id: 'horario', nome: 'Crimes por Horário', icone: '🕐' },
    { id: 'distribuicao', nome: 'Distribuição por Tipo', icone: '🥧' },
    { id: 'tendencia', nome: 'Tendência Crimes Graves', icone: '📊' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-ceara-blue mb-4">
        📊 Análise Avançada de Criminalidade
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {opcoes.map((opcao) => (
          <button
            key={opcao.id}
            onClick={() => setGraficoAtivo(opcao.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              graficoAtivo === opcao.id
                ? 'bg-ceara-blue text-white'
                : 'bg-gray-100 text-ceara-gray hover:bg-gray-200'
            }`}
          >
            {opcao.icone} {opcao.nome}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {renderGrafico()}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="font-medium text-red-800">Alto Risco</span>
          </div>
          <p className="text-red-600 mt-1">Crimes violentos e roubos</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            <span className="font-medium text-yellow-800">Médio Risco</span>
          </div>
          <p className="text-yellow-600 mt-1">Furtos e crimes patrimoniais</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-ceara-green rounded-full"></div>
            <span className="font-medium text-green-800">Baixo Risco</span>
          </div>
          <p className="text-green-600 mt-1">Outros crimes menores</p>
        </div>
      </div>
    </div>
  );
};

export default GraficosAvancados;