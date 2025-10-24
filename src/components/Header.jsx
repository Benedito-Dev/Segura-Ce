import React from 'react';

const Header = () => {
  return (
    <header className="bg-ceara-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🛰️</span>
            <h1 className="text-2xl font-bold">Segura-CE</h1>
          </div>
          <div className="text-sm text-gray-200">
            Dados baseados no CVLIS-CE
          </div>
        </div>
        <p className="mt-2 text-ceara-green font-medium">
          Mapeamento e análise de crimes violentos no Ceará
        </p>
      </div>
    </header>
  );
};

export default Header;