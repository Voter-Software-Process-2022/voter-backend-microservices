import express from 'express'
import bodyParser from 'body-parser'
// import dotenv from 'dotenv'

import user from './routes/user.route.js'
import cors from 'cors'
// dotenv.config()

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ Hi: 'Hello World' })
})

app.use(cors())
app.use('/api/user', user)

const PORT = 5001

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`)
})
