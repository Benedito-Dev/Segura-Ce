export const cearaMunicipios = [
  { nome: "Fortaleza", lat: -3.7319, lng: -38.5267, crimes: 1250, populacao: 2686612 },
  { nome: "Caucaia", lat: -3.7361, lng: -38.6531, crimes: 320, populacao: 362223 },
  { nome: "Juazeiro do Norte", lat: -7.2134, lng: -39.3159, crimes: 180, populacao: 276264 },
  { nome: "Maracanaú", lat: -3.8767, lng: -38.6256, crimes: 150, populacao: 227953 },
  { nome: "Sobral", lat: -3.6861, lng: -40.3492, crimes: 95, populacao: 208935 },
  { nome: "Crato", lat: -7.2342, lng: -39.4097, crimes: 65, populacao: 132123 },
  { nome: "Itapipoca", lat: -3.4944, lng: -39.5786, crimes: 45, populacao: 130597 },
  { nome: "Maranguape", lat: -3.8906, lng: -38.6856, crimes: 55, populacao: 129428 }
];

export const crimesTempo = [
  { mes: "Jan", homicidios: 85, latrocinios: 12, lesoes: 156, roubos: 890, furtos: 1240 },
  { mes: "Fev", homicidios: 78, latrocinios: 8, lesoes: 142, roubos: 820, furtos: 1180 },
  { mes: "Mar", homicidios: 92, latrocinios: 15, lesoes: 168, roubos: 950, furtos: 1320 },
  { mes: "Abr", homicidios: 88, latrocinios: 11, lesoes: 159, roubos: 880, furtos: 1280 },
  { mes: "Mai", homicidios: 95, latrocinios: 13, lesoes: 172, roubos: 920, furtos: 1350 },
  { mes: "Jun", homicidios: 82, latrocinios: 9, lesoes: 148, roubos: 850, furtos: 1200 },
  { mes: "Jul", homicidios: 89, latrocinios: 14, lesoes: 165, roubos: 900, furtos: 1290 },
  { mes: "Ago", homicidios: 93, latrocinios: 16, lesoes: 178, roubos: 940, furtos: 1380 },
  { mes: "Set", homicidios: 87, latrocinios: 10, lesoes: 152, roubos: 870, furtos: 1220 },
  { mes: "Out", homicidios: 91, latrocinios: 12, lesoes: 169, roubos: 910, furtos: 1310 },
  { mes: "Nov", homicidios: 86, latrocinios: 11, lesoes: 158, roubos: 890, furtos: 1250 },
  { mes: "Dez", homicidios: 84, latrocinios: 9, lesoes: 145, roubos: 860, furtos: 1190 }
];

export const crimesHorario = [
  { hora: "00h", crimes: 45 }, { hora: "01h", crimes: 38 }, { hora: "02h", crimes: 32 },
  { hora: "03h", crimes: 28 }, { hora: "04h", crimes: 25 }, { hora: "05h", crimes: 30 },
  { hora: "06h", crimes: 42 }, { hora: "07h", crimes: 58 }, { hora: "08h", crimes: 72 },
  { hora: "09h", crimes: 85 }, { hora: "10h", crimes: 95 }, { hora: "11h", crimes: 102 },
  { hora: "12h", crimes: 118 }, { hora: "13h", crimes: 125 }, { hora: "14h", crimes: 132 },
  { hora: "15h", crimes: 128 }, { hora: "16h", crimes: 135 }, { hora: "17h", crimes: 142 },
  { hora: "18h", crimes: 158 }, { hora: "19h", crimes: 165 }, { hora: "20h", crimes: 172 },
  { hora: "21h", crimes: 168 }, { hora: "22h", crimes: 155 }, { hora: "23h", crimes: 98 }
];

export const fatoresRisco = {
  idade: {
    "16-25": 1.8,
    "26-35": 1.4,
    "36-45": 1.0,
    "46-55": 0.7,
    "56+": 0.4
  },
  genero: {
    "masculino": 1.6,
    "feminino": 0.8
  },
  horario: {
    "madrugada": 2.2,
    "manha": 0.6,
    "tarde": 1.0,
    "noite": 1.8
  },
  transporte: {
    "pe": 1.2,
    "bicicleta": 1.5,
    "moto": 1.8,
    "carro": 0.7,
    "transporte_publico": 1.3
  },
  local: {
    "centro": 1.5,
    "periferia": 2.0,
    "bairro_nobre": 0.5,
    "comercial": 1.3
  }
};