const swaggerJsDoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marketplace API',
            version: '1.0.0',
            description: 'API untuk marketplace merah kuning hijau'
        }
    },
    apis: ['./routes/*.js']
};
const specs = swaggerJsDoc(options);
module.exports = specs;
