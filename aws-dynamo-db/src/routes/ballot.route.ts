import express, { Router, Request, Response } from 'express'
import { create, findById, findAll } from '../db/command.db'
import { IBallot } from '../schemas/ballot.schema'
import { Table } from '../../db.config'

const router: Router = express.Router()

// READ ALL Ballots
router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { success, data } = await findAll(Table.Ballot)

    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Get Ballot by ID
router.get(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { success, data } = await findById(id, Table.Ballot)
    console.log(data)
    if (success) {
      return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
  },
)

// Create Ballot
router.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const BallotData: IBallot = req.body
      const { success, data } = await create(BallotData, Table.Ballot)

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
