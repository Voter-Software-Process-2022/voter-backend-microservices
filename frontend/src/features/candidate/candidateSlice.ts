import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client'

export const fetchAllCandidates = createAsyncThunk(
  'user/fetchAllCandidates',
  async () => {
    const { data } = await client.get('/candidates')
    return data
  },
)

export const fetchCandidateDetails = createAsyncThunk(
  'user/fetchCandidateDetails',
  async ({ candidateId }: { candidateId: number }) => {
    const { data } = await client.get(`/cadidates/${candidateId}`)
    return data
  },
)
