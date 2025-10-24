import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuarios',
    version: '1.0.0',
    description: 'Documentación de la API de usuarios',
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../docs/*.yaml'), // Documentación en archivos YAML
    path.join(__dirname, '../routes/*.js'), // O también puedes usar comentarios JSDoc
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;