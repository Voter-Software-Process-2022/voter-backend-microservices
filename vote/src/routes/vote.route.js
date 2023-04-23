import express from 'express'
import { create, findById, findAll } from '../db/command.db.js'
import { decodeToken } from '../../src/utils/decodeToken.js'
import axios from 'axios'

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

  let accessToken;

  if (req.headers.authorization) {
    accessToken = req.headers.authorization
  } else if (req.cookies?.accessToken) {
    accessToken = req.cookies.accessToken
  }

  if (!accessToken) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  // validate fields
  if (!ballotID || !voteForParty) {
      return res.status(401).json({ success: false, message: 'All fields are required' })
  }

  // check right to vote
  const response = await axios.get(
    `${process.env.USER_API_URL}/pre-verify`,
    {
      token: accessToken,
    },
    {
      headers: {
        'x-api-key': process.env.AWS_API_KEY,
      },
    },
  )

  if (!response) {
    return res.status(401).json({ message: 'Error', error: error })
  }

  if (!response.data.hasRight) {
    return res.status(401).json({ success: false, message: 'Already vote' })
  }

  // check candidateID is valid
  const candidateResponse = await axios.get(
    `${process.env.CANDIDATE_API_URL}/candidates/${voteForParty}`)

  if (candidateResponse.status === 500 && voteForParty !== 0) {
    return res.status(404).json({ message: 'Not found' })
  }

  // ballotID's already exist 
  let { success, data } = await findById(ballotID)

  if (Object.keys(data).length !== 0) {
      return res.status(401).json({ success: false, message: 'This ballotID already exists in our database' })
  }

  ({ success, data } = await create({ ...req.body }));

  if (success) {
  
    // vote taken
    const votedResponse = await axios.post(
      `${process.env.USER_API_URL}/vote-taken`,
      {
        token: accessToken,
      },
      {
        headers: {
          'x-api-key': process.env.AWS_API_KEY,
        },
      },
    )

    if (!votedResponse.success) {
      return res.status(500).json({ success: false, message: 'Error' })
    }

    return res.json({ success, data })
  }

  return res.status(500).json({ success: false, message: 'Error' })
})

router.get('/results', async (req, res) => {
  const { success, data } = await findAll()

  if (!success) {
    return res.status(500).json({ success: false, message: 'Error' })
  }

  let result = {}

  for (let j=0; j <data.length; j++) {
    let id = data[j].voteForParty;

    if (id in result) {
      result[id] += 1;
    } else {
      result[id] = 0;
    }
  }

  return res.json( result )
})

export default router
