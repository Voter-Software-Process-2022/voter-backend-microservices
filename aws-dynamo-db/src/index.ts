import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import ballot from './routes/ballot.route'
import candidate from './routes/candidate.route'
import user from './routes/user.route'
import vote from './routes/vote.route'

const PORT: number = 8000
dotenv.config()

const app: Application = express()

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response): void => {
  res.json({ Hi: 'Hello World' })
})

app.use('/api/ballots', ballot)
app.use('/api/candidates', candidate)
app.use('/api/users', user)
app.use('/api/votes', vote)

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`)
})
