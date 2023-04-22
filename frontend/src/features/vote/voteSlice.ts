/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import client from '../../client'
// import type { GetAllBallotRequest } from '../../generated'
// import { VoteApi, type VoteNoRequest, type VoteRequest } from '../../generated'

// export const voteApi = new VoteApi()

interface VoteRequest {
  ballotId: string
  voteForParty: number
}

export const fetchVoteSubmit = createAsyncThunk(
  'vote/fetchVoteSubmit',
  async ({ ballotId, voteForParty }: VoteRequest) => {
    const submitVoteInput = {
      ballotId: ballotId,
      voteForParty: voteForParty,
    }
    const token = Cookies.get('token')
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await client.post(
      '/votes/submit',
      submitVoteInput,
      options,
    )
    return data
  },
)

export const fetchVoteAllBallot = createAsyncThunk(
  'vote/fetchVoteAllBallot',
  async () => {
    const { data } = await client.get('/votes/ballots')
    return data
  },
)
