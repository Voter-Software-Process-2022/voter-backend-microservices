import express, { Router, Request, Response } from 'express'
import { create, save, deleteById, findById, findAll } from '../db/command.db'
import { IVote } from '../schemas/vote.schema'
import { Table } from '../../db.config'

const router: Router = express.Router()

// READ ALL Votes
router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { success, data } = await findAll(Table.Vote)

    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Get Vote by ID
router.get(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success, data } = await findById(id, Table.Vote)
    console.log(data)
    if (success) {
      return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Create Vote
router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const VoteData: IVote = req.body
      const { success, data } = await create(VoteData, Table.Vote)

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

export default router
