import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { cearaMunicipios } from '../data/mockData';

const MapaCeara = () => {
  const getColor = (crimes, populacao) => {
    const taxa = (crimes / populacao) * 100000;
    if (taxa > 50) return '#dc2626'; // Vermelho
    if (taxa > 30) return '#f59e0b'; // Amarelo
    if (taxa > 15) return '#00A651'; // Verde Ceará
    return '#003366'; // Azul Ceará
  };

  // Limites geográficos do Ceará
  const cearaBounds = [
    [-7.8, -41.5], // Sudoeste
    [-2.7, -37.2]  // Nordeste
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-ceara-blue mb-4">
        🗺️ Mapa Interativo do Ceará
      </h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={[-5.0, -39.5]}
          zoom={7}
          minZoom={6}
          maxZoom={10}
          maxBounds={cearaBounds}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {cearaMunicipios.map((municipio, index) => (
            <CircleMarker
              key={index}
              center={[municipio.lat, municipio.lng]}
              radius={Math.sqrt(municipio.crimes)}
              fillColor={getColor(municipio.crimes, municipio.populacao)}
              color="#fff"
              weight={2}
              opacity={1}
              fillOpacity={0.7}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-ceara-blue">{municipio.nome}</h3>
                  <p>Crimes: {municipio.crimes}</p>
                  <p>População: {municipio.populacao.toLocaleString()}</p>
                  <p>Taxa: {((municipio.crimes / municipio.populacao) * 100000).toFixed(1)}/100k hab</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaCeara;