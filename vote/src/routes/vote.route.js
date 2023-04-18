import express from 'express'
import { create, findById, findAll } from '../db/command.db.js'
import { decodeToken } from '../../src/utils/decodeToken.js'

const router = express.Router()

// Get all ballot
router.get('/ballots', async (req, res) => {
  const { success, data } = await findAll()

  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error' })
})

// Get ballot by id
router.get('/ballot/:id', async (req, res) => {
  const { id } = req.params
  const { success, data } = await findById(id)
  console.log(data)
  if (success) {
    return res.json({ success, data })
  }

  return res.status(500).json({ success: false, message: 'Error' })
})

// Submit vote
router.post('/submit', async (req, res) => {
  const { success, data } = await create({ ...req.body, timestamp: new Date() })

  const token = ''
  const secretKey = ''

  if (success && decodeToken(token, secretKey)) {
    return res.json({ success, data })
  }

  return res.status(500).json({ success: false, message: 'Error' })
})

export default router
