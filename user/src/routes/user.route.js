import express from 'express'
import { save, findById } from '../db/command.db.js'

const router = express.Router()

// Get right to vote (pre-verify)
router.get('/pre-verify', async (req, res) => {
  const citizenID = req.body.citizenID;

  const { success, data } = await findById(citizenID);

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  return res.status(200).json({ hasRight: data.hasRight })
}) 

router.post('/vote-taken', async (req, res) => {
  const citizenID = req.body.citizenID;

  let { success, data } = await findById(citizenID);

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  if (Object.keys(data).length <= 0) {
    return res.status(401).json({ success: false, message: 'Not found' })
  }

  ({ success, data } = await save({ ...{
    citizenID: data.citizenID,
    laserID: data.laserID,
    name: data.name,
    lastname: data.lastname,
    dateOfBirth: data.dateOfBirth,
    religion: data.religion,
    location: data.location,
    nationality: data.nationality,
    hasRight: false
  }}));

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  return res.status(200)
})

export default router