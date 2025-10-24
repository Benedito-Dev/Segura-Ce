import React, { useState } from 'react';
import { fatoresRisco } from '../data/mockData';

const PerfilRisco = () => {
  const [perfil, setPerfil] = useState({
    idade: '26-35',
    genero: 'masculino',
    horario: 'noite',
    transporte: 'carro',
    local: 'centro'
  });

  const calcularRisco = () => {
    const baseRisk = 0.15; // 0.15% base
    const multiplicador = 
      fatoresRisco.idade[perfil.idade] *
      fatoresRisco.genero[perfil.genero] *
      fatoresRisco.horario[perfil.horario] *
      fatoresRisco.transporte[perfil.transporte] *
      fatoresRisco.local[perfil.local];
    
    return (baseRisk * multiplicador).toFixed(3);
  };

  const getRiscoNivel = (risco) => {
    if (risco > 0.4) return { nivel: 'Alto', cor: 'text-red-600', bg: 'bg-red-100' };
    if (risco > 0.2) return { nivel: 'Médio', cor: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { nivel: 'Baixo', cor: 'text-green-600', bg: 'bg-green-100' };
  };

  const risco = calcularRisco();
  const nivelRisco = getRiscoNivel(parseFloat(risco));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-ceara-blue mb-4">
        🎯 Análise de Risco Personalizada
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ceara-gray mb-2">Faixa Etária</label>
            <select 
              value={perfil.idade}
              onChange={(e) => setPerfil({...perfil, idade: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-ceara-blue focus:border-ceara-blue"
            >
              <option value="16-25">16-25 anos</option>
              <option value="26-35">26-35 anos</option>
              <option value="36-45">36-45 anos</option>
              <option value="46-55">46-55 anos</option>
              <option value="56+">56+ anos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ceara-gray mb-2">Gênero</label>
            <select 
              value={perfil.genero}
              onChange={(e) => setPerfil({...perfil, genero: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-ceara-blue focus:border-ceara-blue"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ceara-gray mb-2">Horário de Circulação</label>
            <select 
              value={perfil.horario}
              onChange={(e) => setPerfil({...perfil, horario: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-ceara-blue focus:border-ceara-blue"
            >
              <option value="madrugada">Madrugada (00h-06h)</option>
              <option value="manha">Manhã (06h-12h)</option>
              <option value="tarde">Tarde (12h-18h)</option>
              <option value="noite">Noite (18h-00h)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ceara-gray mb-2">Meio de Transporte</label>
            <select 
              value={perfil.transporte}
              onChange={(e) => setPerfil({...perfil, transporte: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-ceara-blue focus:border-ceara-blue"
            >
              <option value="pe">A pé</option>
              <option value="bicicleta">Bicicleta</option>
              <option value="moto">Motocicleta</option>
              <option value="carro">Carro</option>
              <option value="transporte_publico">Transporte Público</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ceara-gray mb-2">Tipo de Local</label>
            <select 
              value={perfil.local}
              onChange={(e) => setPerfil({...perfil, local: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-ceara-blue focus:border-ceara-blue"
            >
              <option value="centro">Centro da cidade</option>
              <option value="periferia">Periferia</option>
              <option value="bairro_nobre">Bairro nobre</option>
              <option value="comercial">Área comercial</option>
            </select>
          </div>

          <div className={`p-4 rounded-lg ${nivelRisco.bg} border-l-4 border-current`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ceara-gray">Probabilidade de Risco</p>
                <p className="text-2xl font-bold text-ceara-blue">{risco}%</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${nivelRisco.bg} ${nivelRisco.cor} font-medium`}>
                {nivelRisco.nivel}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-ceara-gray">
          * Cálculo baseado em dados estatísticos simulados. Não substitui medidas de segurança pessoal.
        </p>
      </div>
    </div>
  );
};

export default PerfilRisco;