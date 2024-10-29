import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const PORT: string | number = process.env.PORT || 3000

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
  apis: ['./routes/*.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use((req: Request, res: Response) => {
  res.status(404).json({
    errorCode: '#404',
    errorMessage: 'Route not found',
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
