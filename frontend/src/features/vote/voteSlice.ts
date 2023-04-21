/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { GetAllBallotRequest } from '../../generated'
import { VoteApi, type VoteNoRequest, type VoteRequest } from '../../generated'

export const voteApi = new VoteApi()

export const fetchVoteSubmit = createAsyncThunk(
  'vote/fetchVoteSubmit',
  async ({ ballotId, candidateId, areaId }: VoteRequest) => {
    const submitVoteInput = {
      ballotId: ballotId,
      candidateId: candidateId,
      areaId: areaId,
    }
    const token = Cookies.get('token')
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await voteApi.voteSubmitPost(submitVoteInput, options)
    return data
  },
)

export const fetchVoteNo = createAsyncThunk(
  'vote/fetchVoteNo',
  async ({ ballotId }: VoteNoRequest) => {
    const submitVoteNoInput = {
      ballotId: ballotId,
    }
    const token = Cookies.get('token')
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await voteApi.voteNoPost(submitVoteNoInput, options)
    return data
  },
)

export const fetchMpCandidates = createAsyncThunk(
  'vote/fetchVoteSubmit',
  async () => {
    const token = Cookies.get('token')
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data } = await voteApi.voteMpcandidateGet(options)
    return data
  },
)

export const fetchVoteAllBallot = createAsyncThunk(
  'vote/fetchVoteAllBallot',
  async ({ areaId }: GetAllBallotRequest) => {
    const submitVoteAllBallot: GetAllBallotRequest = {
      areaId: areaId,
    }
    const { data } = await voteApi.voteAllBallotPost(submitVoteAllBallot)
    return data
  },
)
