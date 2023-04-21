import { createAsyncThunk } from '@reduxjs/toolkit'

// TODO: replace candidateApi with the new endpoint
export const fetchAllCandidates = createAsyncThunk(
  'user/fetchAllCandidates',
  async () => {
    const { data } = await candidateApi.candidateVoteTopicIdGet()
    return data
  },
)

export const fetchCandidateDetails = createAsyncThunk(
  'user/fetchCandidateDetails',
  async ({ candidateId }: { candidateId: number }) => {
    const { data } = await candidateApi.candidateVoteTopicIdCandidateIdGet(
      candidateId,
    )
    return data
  },
)

export const fetchPartyMembers = createAsyncThunk(
  'user/fetchPartyMembers',
  async ({ partyId }: { partyId: number }) => {
    const { data } = await candidateApi.candidatePartymemberPartyIdGet(partyId)
    return data
  },
)
