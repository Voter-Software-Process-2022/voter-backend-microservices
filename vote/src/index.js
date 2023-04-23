import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import vote from './routes/vote.route.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ Hi: 'Hello World' })
})

app.use('/api/vote', vote)

const PORT = 6001

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`)
})
