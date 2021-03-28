const app = require('./app')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const spec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Peer Recognition Tool',
      version: '0.0.0',
      description: 'UKG Peer Recognition Tool - COMPSCI 320, Spring 2021'
    }
  },

  apis: ['./*.js']
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec))
