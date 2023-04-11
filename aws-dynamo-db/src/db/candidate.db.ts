import { db, Table } from '../../db.config.js'
import { ICandidate } from '../schemas/candidate.schema.js'

const CandidateTable = Table.Candidate

// Create or Update candidates
const createOrUpdate = async (data: ICandidate = {} as ICandidate) => {
  const params = {
    TableName: CandidateTable,
    Item: data,
  }

  try {
    await db.put(params).promise()
    return { success: true, data: data }
  } catch (error) {
    return { success: false, data: data }
  }
}

// Read all candidates
const readAllCandidates = async () => {
  const params = {
    TableName: CandidateTable,
  }

  try {
    const { Items = [] } = await db.scan(params).promise()
    return { success: true, data: Items }
  } catch (error) {
    return { success: false, data: null }
  }
}

// Read Candidate by ID
const getCandidateById = async (value: string, key: string = 'id') => {
  const params = {
    TableName: CandidateTable,
    Key: {
      [key]: parseInt(value),
    },
  }
  try {
    const { Item = {} } = await db.get(params).promise()
    return { success: true, data: Item }
  } catch (error) {
    return { success: false, data: null }
  }
}

// Delete Candidate by ID
const deleteCandidateById = async (value: string, key: string = 'id') => {
  const params = {
    TableName: CandidateTable,
    Key: {
      [key]: parseInt(value),
    },
  }

  try {
    await db.delete(params).promise()
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export {
  createOrUpdate,
  readAllCandidates,
  getCandidateById,
  deleteCandidateById,
}
