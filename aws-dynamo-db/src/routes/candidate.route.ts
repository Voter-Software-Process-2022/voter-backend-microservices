import express, { Router, Request, Response } from 'express'
import {
  createOrUpdate,
  deleteCandidateById,
  getCandidateById,
  readAllCandidates,
} from '../db/candidate.db'
import { ICandidate } from '../schemas/candidate.schema.js'

const router: Router = express.Router()

// READ ALL Candidates
router.get('/candidates', async (req: Request, res: Response): Promise<Response> => {
  const { success, data } = await readAllCandidates()

  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error' })
})

// Get Candidate by ID
router.get(
  '/candidate/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success, data } = await getCandidateById(id)
    console.log(data)
    if (success) {
      return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Create Candidate
router.post('/candidate', async (req: Request, res: Response): Promise<Response> => {
  const { success, data } = await createOrUpdate(req.body)

  if (success) {
    return res.json({ success, data })
  }

  return res.status(500).json({ success: false, message: 'Error' })
})

// Update Candidate by ID
router.put(
  '/candidate/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const candidate = req.body
    const { id } = req.params
    candidate.id = parseInt(id)

    const { success, data } = await createOrUpdate(candidate)

    if (success) {
      return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Delete Candidate by Id
router.delete(
  '/candidate/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success } = await deleteCandidateById(id)
    if (success) {
      return res.json({ success })
    }
    return res.status(500).json({ success: false, message: 'Error' })
  },
)

export default router
