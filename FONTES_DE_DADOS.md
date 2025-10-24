# 📊 Fontes de Dados Reais para Segura-CE

## 🏛️ Fontes Governamentais Oficiais

### **CVLIS-CE (Central de Estatísticas de Violência e Segurança Pública)**
- **URL**: https://www.sspds.ce.gov.br/estatisticas/
- **Dados**: Homicídios, latrocínios, lesões corporais, roubos por município
- **Formato**: Relatórios PDF, planilhas Excel
- **Frequência**: Mensal/Trimestral
- **Status**: ✅ Público

### **Portal da Transparência do Ceará**
- **URL**: https://www.transparencia.ce.gov.br/
- **Dados**: Gastos com segurança pública, efetivo policial
- **Formato**: CSV, JSON via API
- **Frequência**: Tempo real
- **Status**: ✅ Público

### **IBGE - Estimativas Populacionais**
- **URL**: https://www.ibge.gov.br/estatisticas/sociais/populacao/
- **API**: https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios
- **Dados**: População por município, dados socioeconômicos
- **Formato**: JSON, XML
- **Status**: ✅ Público

## 🌐 APIs e Dados Abertos

### **Portal Brasileiro de Dados Abertos**
- **URL**: https://dados.gov.br/
- **Busca**: "segurança pública ceará"
- **Dados**: Estatísticas criminais, ocorrências policiais
- **Formato**: CSV, JSON, XML
- **Status**: ✅ Público

### **DataSUS - Sistema de Informações sobre Mortalidade**
- **URL**: http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sim/cnv/ext10ce.def
- **Dados**: Óbitos por causas externas (homicídios)
- **Formato**: Tabelas HTML, CSV
- **Cobertura**: Ceará por município
- **Status**: ✅ Público

### **Atlas da Violência - IPEA**
- **URL**: https://www.ipea.gov.br/atlasviolencia/
- **Dados**: Indicadores de violência por estado/município
- **Formato**: Excel, PDF
- **Frequência**: Anual
- **Status**: ✅ Público

## 🗺️ Dados Geográficos

### **IBGE - Malhas Territoriais**
- **URL**: https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/
- **Dados**: Shapefiles dos municípios do Ceará
- **Formato**: SHP, GeoJSON, KML
- **Status**: ✅ Público

### **OpenStreetMap Ceará**
- **URL**: https://download.geofabrik.de/south-america/brazil/nordeste.html
- **Dados**: Mapas detalhados, pontos de interesse
- **Formato**: OSM, PBF
- **Status**: ✅ Público

### **INPE - Dados Socioeconômicos**
- **URL**: http://www.dpi.inpe.br/
- **Dados**: Índices socioeconômicos por município
- **Formato**: Shapefiles com atributos
- **Status**: ✅ Público

## 📱 APIs de Terceiros

### **ViaCEP**
- **URL**: https://viacep.com.br/
- **Dados**: CEPs, bairros, coordenadas
- **Formato**: JSON
- **Uso**: Geolocalização de ocorrências
- **Status**: ✅ Gratuito

### **Nominatim (OpenStreetMap)**
- **URL**: https://nominatim.openstreetmap.org/
- **Dados**: Geocodificação reversa
- **Formato**: JSON, XML
- **Uso**: Converter coordenadas em endereços
- **Status**: ✅ Gratuito

## 🏢 Fontes Acadêmicas e Institutos

### **Laboratório de Estudos da Violência - UFC**
- **URL**: https://www.ufc.br/
- **Dados**: Pesquisas sobre violência urbana no Ceará
- **Formato**: Relatórios PDF, artigos
- **Status**: 📧 Contato necessário

### **Fórum Brasileiro de Segurança Pública**
- **URL**: https://forumseguranca.org.br/
- **Dados**: Anuário Brasileiro de Segurança Pública
- **Formato**: PDF, planilhas
- **Cobertura**: Dados estaduais detalhados
- **Status**: ✅ Público

### **Observatório da Violência - UECE**
- **URL**: http://www.uece.br/
- **Dados**: Análises locais de criminalidade
- **Status**: 📧 Contato necessário

## 🔄 APIs para Integração

### **Exemplo de Integração - IBGE Municípios**
```javascript
// Buscar municípios do Ceará
const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios');
const municipios = await response.json();
```

### **Exemplo de Integração - ViaCEP**
```javascript
// Buscar dados de CEP
const response = await fetch('https://viacep.com.br/ws/60000000/json/');
const endereco = await response.json();
```

## 📋 Checklist de Implementação

### **Fase 1: Dados Básicos**
- [ ] Integrar API IBGE para municípios
- [ ] Baixar dados CVLIS-CE (manual)
- [ ] Implementar parser para PDFs/Excel
- [ ] Criar banco de dados local

### **Fase 2: Geolocalização**
- [ ] Integrar malhas territoriais IBGE
- [ ] Implementar ViaCEP para endereços
- [ ] Configurar Nominatim para geocoding
- [ ] Otimizar consultas geográficas

### **Fase 3: Dados Avançados**
- [ ] Integrar Portal da Transparência
- [ ] Conectar com DataSUS
- [ ] Implementar cache inteligente
- [ ] Criar sistema de atualização automática

## ⚖️ Considerações Legais

### **LGPD (Lei Geral de Proteção de Dados)**
- ✅ Usar apenas dados agregados e anonimizados
- ✅ Não coletar dados pessoais de vítimas
- ✅ Implementar política de privacidade
- ✅ Permitir opt-out de dados de localização

### **Termos de Uso**
- ✅ Respeitar limites de rate das APIs
- ✅ Atribuir fontes corretamente
- ✅ Não redistribuir dados sem autorização
- ✅ Usar dados apenas para fins educacionais/pesquisa

## 🔧 Ferramentas Recomendadas

### **ETL (Extract, Transform, Load)**
- **Python**: pandas, requests, geopandas
- **Node.js**: axios, csv-parser, turf.js
- **Banco**: PostgreSQL + PostGIS

### **Processamento de PDFs**
- **Python**: PyPDF2, tabula-py, camelot
- **Node.js**: pdf-parse, pdf2table

### **Análise Geoespacial**
- **QGIS**: Processamento de shapefiles
- **PostGIS**: Consultas espaciais
- **Turf.js**: Análise geográfica no frontend

## 📞 Contatos Úteis

### **SSPDS-CE**
- **Email**: estatisticas@sspds.ce.gov.br
- **Telefone**: (85) 3101-2000
- **Endereço**: Av. Bezerra de Menezes, 1057 - São Gerardo, Fortaleza

### **IBGE Ceará**
- **Email**: ibge.ce@ibge.gov.br
- **Telefone**: (85) 3218-4500

### **Controladoria Geral do Estado**
- **Email**: transparencia@cge.ce.gov.br
- **Portal**: https://www.cge.ce.gov.br/

---

> **⚠️ Importante**: Sempre verificar a atualidade dos dados e respeitar os termos de uso de cada fonte. Para dados sensíveis, considerar acordos de cooperação técnica com os órgãos responsáveis.