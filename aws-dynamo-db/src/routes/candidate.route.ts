import express, { Router, Request, Response } from 'express'
import { create, save, deleteById, findById, findAll } from '../db/command.db'
import { ICandidate } from '../schemas/candidate.schema'
import { Table } from '../../db.config'

const router: Router = express.Router()

// READ ALL Candidates
router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { success, data } = await findAll(Table.Candidate)

    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Get Candidate by ID
router.get(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success, data } = await findById(id, Table.Candidate)
    console.log(data)
    if (success) {
      return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Create Candidate
router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const candidateData: ICandidate = req.body
      const { success, data } = await create(candidateData, Table.Candidate)

      if (success) {
        return res.json({ success, data })
      }

      return res.status(500).json({ success: false, message: 'Error' })
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid request body' })
    }
  },
)

// Update Candidate by ID
router.put(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const candidateData: ICandidate = req.body
      const { id } = req.params
      candidateData.id = parseInt(id)

      const { success, data } = await save(candidateData, Table.Candidate)

      if (success) {
        return res.json({ success, data })
      }

      return res.status(500).json({ success: false, message: 'Error' })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body or URL parameter',
      })
    }
  },
)

// Delete Candidate by Id
router.delete(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success } = await deleteById(id, Table.Candidate)
    if (success) {
      return res.json({ success })
    }
    return res.status(500).json({ success: false, message: 'Error' })
  },
)

export default router
