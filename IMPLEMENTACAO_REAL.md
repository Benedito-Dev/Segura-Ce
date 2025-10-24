# 🚀 Guia de Implementação com Dados Reais

## 📋 Roadmap de Implementação

### **Fase 1: Infraestrutura Base (2-3 semanas)**

#### Backend Setup
```bash
# Criar API Node.js/Express
npm init -y
npm install express cors helmet morgan compression
npm install pg sequelize # PostgreSQL + ORM
npm install node-cron axios cheerio # Scraping e agendamento
```

#### Banco de Dados
```sql
-- Estrutura básica PostgreSQL + PostGIS
CREATE EXTENSION postgis;

CREATE TABLE municipios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    codigo_ibge INTEGER UNIQUE,
    populacao INTEGER,
    geometria GEOMETRY(POLYGON, 4326),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crimes (
    id SERIAL PRIMARY KEY,
    municipio_id INTEGER REFERENCES municipios(id),
    tipo_crime VARCHAR(50),
    quantidade INTEGER,
    mes_ano DATE,
    taxa_100k DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Fase 2: Integração IBGE (1 semana)**

#### Script de População de Municípios
```javascript
// scripts/populate-municipios.js
const axios = require('axios');
const { Municipio } = require('../models');

async function populateMunicipios() {
    const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/23/municipios'
    );
    
    for (const municipio of response.data) {
        await Municipio.findOrCreate({
            where: { codigo_ibge: municipio.id },
            defaults: {
                nome: municipio.nome,
                codigo_ibge: municipio.id
            }
        });
    }
}
```

#### Integração com Estimativas Populacionais
```javascript
// services/ibge-service.js
class IBGEService {
    async getPopulacao(codigoMunicipio) {
        const url = `https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/${codigoMunicipio}`;
        const response = await axios.get(url);
        return response.data.projecao.populacao;
    }
    
    async updatePopulacoes() {
        const municipios = await Municipio.findAll();
        for (const municipio of municipios) {
            const populacao = await this.getPopulacao(municipio.codigo_ibge);
            await municipio.update({ populacao });
        }
    }
}
```

### **Fase 3: Scraping CVLIS-CE (2-3 semanas)**

#### Parser de PDFs CVLIS
```javascript
// services/cvlis-scraper.js
const pdf = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');

class CVLISScraper {
    async downloadLatestReport() {
        // URL do relatório mais recente (verificar manualmente)
        const pdfUrl = 'https://www.sspds.ce.gov.br/wp-content/uploads/sites/2/2024/01/cvlis-2024.pdf';
        
        const response = await axios.get(pdfUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream('temp/cvlis-latest.pdf');
        response.data.pipe(writer);
        
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
    
    async parsePDF() {
        const dataBuffer = fs.readFileSync('temp/cvlis-latest.pdf');
        const data = await pdf(dataBuffer);
        
        // Regex para extrair dados (ajustar conforme formato do PDF)
        const regex = /(\w+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
        const crimes = [];
        
        let match;
        while ((match = regex.exec(data.text)) !== null) {
            crimes.push({
                municipio: match[1],
                homicidios: parseInt(match[2]),
                latrocinios: parseInt(match[3]),
                lesoes: parseInt(match[4])
            });
        }
        
        return crimes;
    }
}
```

### **Fase 4: API REST (1-2 semanas)**

#### Endpoints Principais
```javascript
// routes/api.js
const express = require('express');
const router = express.Router();
const { Crime, Municipio } = require('../models');

// GET /api/crimes/municipios
router.get('/crimes/municipios', async (req, res) => {
    const crimes = await Crime.findAll({
        include: [{ model: Municipio, attributes: ['nome', 'codigo_ibge'] }],
        where: { mes_ano: req.query.mes || new Date() }
    });
    res.json(crimes);
});

// GET /api/crimes/evolucao/:municipio
router.get('/crimes/evolucao/:municipio', async (req, res) => {
    const evolucao = await Crime.findAll({
        where: { municipio_id: req.params.municipio },
        order: [['mes_ano', 'ASC']],
        limit: 12
    });
    res.json(evolucao);
});

// GET /api/predicao/:municipio
router.get('/predicao/:municipio', async (req, res) => {
    // Implementar algoritmo de predição simples
    const historico = await Crime.findAll({
        where: { municipio_id: req.params.municipio },
        order: [['mes_ano', 'DESC']],
        limit: 6
    });
    
    const predicao = calcularPredicao(historico);
    res.json(predicao);
});
```

### **Fase 5: Frontend Real (2 semanas)**

#### Service para API
```javascript
// src/services/api.js
class SeguraCEAPI {
    constructor() {
        this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    }
    
    async getCrimesMunicipios(mes = null) {
        const params = mes ? `?mes=${mes}` : '';
        const response = await fetch(`${this.baseURL}/crimes/municipios${params}`);
        return response.json();
    }
    
    async getEvolucaoCrimes(municipioId) {
        const response = await fetch(`${this.baseURL}/crimes/evolucao/${municipioId}`);
        return response.json();
    }
    
    async getPredicao(municipioId) {
        const response = await fetch(`${this.baseURL}/predicao/${municipioId}`);
        return response.json();
    }
    
    async calcularRiscoPerfil(perfil) {
        const response = await fetch(`${this.baseURL}/risco/calcular`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perfil)
        });
        return response.json();
    }
}
```

#### Hook Customizado
```javascript
// src/hooks/useCrimesData.js
import { useState, useEffect } from 'react';
import { SeguraCEAPI } from '../services/api';

export const useCrimesData = () => {
    const [crimes, setCrimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const api = new SeguraCEAPI();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.getCrimesMunicipios();
                setCrimes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    return { crimes, loading, error, refetch: fetchData };
};
```

### **Fase 6: Automação e Monitoramento (1 semana)**

#### Cron Jobs para Atualização
```javascript
// jobs/update-data.js
const cron = require('node-cron');
const { CVLISScraper } = require('../services/cvlis-scraper');
const { IBGEService } = require('../services/ibge-service');

// Atualizar dados CVLIS toda segunda-feira às 6h
cron.schedule('0 6 * * 1', async () => {
    console.log('Iniciando atualização CVLIS...');
    const scraper = new CVLISScraper();
    await scraper.downloadLatestReport();
    const crimes = await scraper.parsePDF();
    await saveCrimesToDB(crimes);
    console.log('Atualização CVLIS concluída');
});

// Atualizar população IBGE mensalmente
cron.schedule('0 2 1 * *', async () => {
    console.log('Atualizando dados populacionais...');
    const ibge = new IBGEService();
    await ibge.updatePopulacoes();
    console.log('Dados populacionais atualizados');
});
```

## 🔧 Configuração de Ambiente

### **Variáveis de Ambiente**
```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/segura_ce
REDIS_URL=redis://localhost:6379
CVLIS_CHECK_INTERVAL=86400000
IBGE_API_KEY=your_key_here
SENTRY_DSN=your_sentry_dsn
NODE_ENV=production
```

### **Docker Setup**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/segura_ce
    depends_on:
      - db
      - redis
  
  db:
    image: postgis/postgis:14-3.2
    environment:
      POSTGRES_DB: segura_ce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    
volumes:
  postgres_data:
```

## 📊 Monitoramento e Analytics

### **Métricas Importantes**
- Taxa de atualização de dados
- Precisão das predições
- Tempo de resposta da API
- Uso por região/funcionalidade

### **Alertas Automáticos**
```javascript
// services/alert-service.js
class AlertService {
    async checkAnomalies() {
        // Detectar picos anômalos de criminalidade
        const crimes = await Crime.findAll({
            where: { mes_ano: new Date() }
        });
        
        for (const crime of crimes) {
            const media = await this.getMediaHistorica(crime.municipio_id);
            if (crime.quantidade > media * 1.5) {
                await this.sendAlert({
                    tipo: 'pico_criminalidade',
                    municipio: crime.municipio_id,
                    valor: crime.quantidade,
                    media: media
                });
            }
        }
    }
}
```

## 🚀 Deploy e Produção

### **Checklist de Deploy**
- [ ] Configurar SSL/HTTPS
- [ ] Implementar rate limiting
- [ ] Configurar backup automático do banco
- [ ] Monitoramento com Sentry/DataDog
- [ ] CDN para assets estáticos
- [ ] Cache Redis para consultas frequentes
- [ ] Logs estruturados
- [ ] Health checks

### **Estimativa de Custos (AWS)**
- **EC2 t3.medium**: ~$30/mês
- **RDS PostgreSQL**: ~$25/mês  
- **CloudFront CDN**: ~$5/mês
- **S3 Storage**: ~$3/mês
- **Total**: ~$63/mês

---

> **💡 Dica**: Começar com dados de 2-3 municípios principais (Fortaleza, Sobral, Juazeiro) para validar a arquitetura antes de expandir para todo o estado.