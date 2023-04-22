import { db, tableName } from '../../db.config.js'

// Insert data
const create = async (data = {}) => {
  const params = {
    TableName: tableName,
    Item: data,
  }

  try {
    await db.put(params).promise()
    return { success: true, data: data, error: null }
  } catch (error) {
    return { success: false, data: data, error: error }
  }
}

// Update data
const save = async (data = {}) => {
  const params = {
    TableName: tableName,
    Item: data,
  }

  try {
    await db.put(params).promise()
    return { success: true, data: data, error: null }
  } catch (error) {
    return { success: false, data: data, error: error }
  }
}

// Read all data
const findAll = async () => {
  const params = {
    TableName: tableName,
  }

  try {
    const { Items = [] } = await db.scan(params).promise()
    return { success: true, data: Items, error: null }
  } catch (error) {
    return { success: false, data: null, error: error }
  }
}

// Read data by ID
const findById = async (value, key = 'citizenID') => {
  const params = {
    TableName: tableName,
    Key: {
      [key]: value,
    },
  }
  try {
    const { Item = {} } = await db.get(params).promise()
    return { success: true, data: Item, error: null }
  } catch (error) {
    return { success: false, data: null, error: error }
  }
}

// Delete data by ID
const deleteById = async (value, key = 'id') => {
  const params = {
    TableName: tableName,
    Key: {
      [key]: parseInt(value),
    },
  }

  try {
    await db.delete(params).promise()
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error }
  }
}

export { create, save, findAll, findById, deleteById }
