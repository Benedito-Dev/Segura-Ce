import React, { useState, useEffect } from 'react';

const AlertasSeguranca = () => {
  const [alertas, setAlertas] = useState([]);

  const alertasSimulados = [
    {
      id: 1,
      tipo: 'alto',
      titulo: 'Aumento de Roubos - Centro de Fortaleza',
      descricao: 'Registrado aumento de 25% nos roubos na região central nas últimas 48h',
      tempo: '2 horas atrás',
      local: 'Centro, Fortaleza',
      icone: '🚨'
    },
    {
      id: 2,
      tipo: 'medio',
      titulo: 'Padrão Suspeito Detectado',
      descricao: 'IA detectou padrão incomum de crimes em horário comercial',
      tempo: '5 horas atrás',
      local: 'Aldeota, Fortaleza',
      icone: '⚠️'
    },
    {
      id: 3,
      tipo: 'info',
      titulo: 'Operação Policial em Andamento',
      descricao: 'Reforço policial na região do Mucuripe até 22h',
      tempo: '1 hora atrás',
      local: 'Mucuripe, Fortaleza',
      icone: '👮'
    },
    {
      id: 4,
      tipo: 'baixo',
      titulo: 'Redução de Crimes - Sobral',
      descricao: 'Diminuição de 15% nos índices criminais na última semana',
      tempo: '3 horas atrás',
      local: 'Sobral',
      icone: '✅'
    }
  ];

  useEffect(() => {
    setAlertas(alertasSimulados);
  }, []);

  const getTipoStyle = (tipo) => {
    switch(tipo) {
      case 'alto':
        return 'border-l-red-500 bg-red-50';
      case 'medio':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'baixo':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTipoTexto = (tipo) => {
    switch(tipo) {
      case 'alto':
        return { texto: 'CRÍTICO', cor: 'text-red-600' };
      case 'medio':
        return { texto: 'ATENÇÃO', cor: 'text-yellow-600' };
      case 'baixo':
        return { texto: 'POSITIVO', cor: 'text-green-600' };
      default:
        return { texto: 'INFO', cor: 'text-blue-600' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-ceara-blue">
          🔔 Alertas de Segurança
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-ceara-green rounded-full animate-pulse"></div>
          <span className="text-sm text-ceara-gray">Tempo Real</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alertas.map((alerta) => {
          const tipoInfo = getTipoTexto(alerta.tipo);
          return (
            <div 
              key={alerta.id}
              className={`border-l-4 p-4 rounded-r-lg ${getTipoStyle(alerta.tipo)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{alerta.icone}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${tipoInfo.cor} bg-white`}>
                        {tipoInfo.texto}
                      </span>
                      <span className="text-xs text-ceara-gray">{alerta.tempo}</span>
                    </div>
                    <h3 className="font-semibold text-ceara-blue mb-1">
                      {alerta.titulo}
                    </h3>
                    <p className="text-sm text-ceara-gray mb-2">
                      {alerta.descricao}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">📍</span>
                      <span className="text-xs font-medium text-ceara-blue">
                        {alerta.local}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-ceara-blue bg-opacity-5 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🤖</span>
          <div>
            <p className="text-sm font-medium text-ceara-blue">Sistema de IA Ativo</p>
            <p className="text-xs text-ceara-gray">
              Monitoramento 24/7 com análise preditiva de padrões criminais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasSeguranca;