import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import client from '../../client'

interface VoteRequest {
  ballotId: string
  voteForParty: number
}

export const fetchVoteSubmit = createAsyncThunk(
  'vote/fetchVoteSubmit',
  async ({ ballotId, voteForParty }: VoteRequest) => {
    const submitVoteInput = {
      ballotID: ballotId,
      voteForParty: voteForParty,
    }
    const token = Cookies.get('token')
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await client.post('/vote/submit', submitVoteInput, options)
    return data
  },
)

export const fetchVoteAllBallot = createAsyncThunk(
  'vote/fetchVoteAllBallot',
  async () => {
    const { data } = await client.get('/vote/ballots')
    return data
  },
)

export const fetchVoteResults = createAsyncThunk(
  'vote/fetchVoteResults',
  async () => {
    const { data } = await client.get('/vote/results')
    return data
  },
)
