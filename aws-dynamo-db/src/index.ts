import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import candidate from './routes/candidate.route'

dotenv.config()

const app: Application = express()

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response): void => {
  res.json({ Hi: 'Hello World' })
})

app.use('/api', candidate)

const PORT: number = 8000

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`)
})
