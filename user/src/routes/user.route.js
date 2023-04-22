import express from 'express'
import { save, findById } from '../db/command.db.js'
import { deserializeUser } from '../middleware/deserializeUser.js'

const router = express.Router()

// Get right to vote (pre-verify)
router.get('/pre-verify', deserializeUser, async (req, res) => {
  const user = res.locals.user
  const citizenID = user.citizenID;

  const { success, data } = await findById(citizenID);

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  if (Object.keys(data).length <= 0) {
    return res.status(401).json({ success: false, message: 'Not found' })
  }

  return res.status(200).json({ hasRight: data.hasRight })
})

// already vote
router.post('/vote-taken', deserializeUser, async (req, res) => {
  const user = res.locals.user
  const citizenID = user.citizenID;

  const { success, data } = await findById(citizenID)

  if (!data.hasRight) {
    return res.status(200).json({ success: true, messgae: 'User already vote' })
  }

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  if (Object.keys(data).length <= 0) {
    return res.status(401).json({ success: false, message: 'Not found' })
  }

  const saved = await save({
    ...{
      citizenID: data.citizenID,
      laserID: data.laserID,
      name: data.name,
      lastname: data.lastname,
      dateOfBirth: data.dateOfBirth,
      religion: data.religion,
      location: data.location,
      nationality: data.nationality,
      hasRight: false,
    },
  })

  if (!saved.success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  return res.status(200).json({ success: true, messgae: 'Voted' })
})

router.get('/me', deserializeUser, async (req, res) => {
  return res.status(200).json({ success: true, user: res.locals.user })
})

export default router
