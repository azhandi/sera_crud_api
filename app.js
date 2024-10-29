const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()
const is_swagger = process.env.IS_SWAGGER === '1'
const PORT = is_swagger ? process.env.SWAGGER_PORT || 3001 : process.env.PORT || 3000

app.use(bodyParser.json())

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'NodeJS Backend CRUD API',
          version: '1.0.0',
          description: 'API Documentation',
      },
      servers: [
          {
              url: 'http://localhost:3000',
          },
      ],
  },
  apis: ['./routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use((req, res) => {
    res.status(404).json({
        errorCode: '#404',
        errorMessage: 'Route not found',
    })
})

app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`)
})
