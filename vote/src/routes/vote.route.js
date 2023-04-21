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
  const ballotID = req.body.ballotID;  // in prod, server will be generate
  const voteForParty = req.body.voteForParty;
  const token = ''  // ??
  const secretKey = ''  // ??

  // validate fields
  if (!ballotID || !voteForParty) {
      return res.status(401).json({ success: false, message: 'All fields are required' })
  }

  // check right to vote

  // check candidateID is valid

  // ballotID's already exist 
  let { success, data } = await findById(ballotID)

  if (Object.keys(data).length !== 0) {
      return res.status(401).json({ success: false, message: 'This ballotID already exists in our database' })
  }

  ({ success, data } = await create({ ...req.body, timestamp: new Date() }));

  if (success && decodeToken(token, secretKey)) {
    // vote taken

    return res.json({ success, data })
  }

  return res.status(500).json({ success: false, message: 'Error' })
})

export default router
