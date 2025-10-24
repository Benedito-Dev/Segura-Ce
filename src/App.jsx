import React, { useState } from 'react';
import Header from './components/Header';
import Estatisticas from './components/Estatisticas';
import MapaCeara from './components/MapaCeara';
import GraficoCrimes from './components/GraficoCrimes';
import PerfilRisco from './components/PerfilRisco';
import GraficosAvancados from './components/GraficosAvancados';
import PredicaoCrimes from './components/PredicaoCrimes';
import AlertasSeguranca from './components/AlertasSeguranca';

function App() {
  const [abaSelecionada, setAbaSelecionada] = useState('dashboard');

  const abas = [
    { id: 'dashboard', nome: 'Dashboard', icone: '📊' },
    { id: 'analise', nome: 'Análise Avançada', icone: '🔍' },
    { id: 'risco', nome: 'Perfil de Risco', icone: '🎯' },
    { id: 'predicao', nome: 'Predições', icone: '🔮' }
  ];

  const renderConteudo = () => {
    switch(abaSelecionada) {
      case 'dashboard':
        return (
          <>
            <section className="mb-8">
              <Estatisticas />
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <MapaCeara />
              <GraficoCrimes />
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AlertasSeguranca />
              <div className="bg-ceara-blue text-white rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Transparência de Dados</h3>
                    <p className="text-gray-200">
                      Os dados apresentados são simulados para fins de protótipo, baseados em padrões do CVLIS-CE. 
                      Nenhum dado real de localização individual é utilizado. Este projeto possui finalidade educacional e de pesquisa.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      case 'analise':
        return (
          <section className="mb-8">
            <GraficosAvancados />
          </section>
        );
      case 'risco':
        return (
          <section className="mb-8">
            <PerfilRisco />
          </section>
        );
      case 'predicao':
        return (
          <section className="mb-8">
            <PredicaoCrimes />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navegação por Abas */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {abas.map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaSelecionada(aba.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  abaSelecionada === aba.id
                    ? 'border-ceara-blue text-ceara-blue'
                    : 'border-transparent text-ceara-gray hover:text-ceara-blue hover:border-gray-300'
                }`}
              >
                {aba.icone} {aba.nome}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderConteudo()}
      </main>

      <footer className="bg-ceara-blue text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-ceara-green">🛰️ Segura-CE - Projeto em desenvolvimento</p>
          <p className="text-sm text-gray-300 mt-2">
            Baseado em dados do CVLIS-CE • Finalidade educacional
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;