const { findByKey, save } = require('../repositories/file.repository')
const uuid = require('uuid').v4

exports.getFile = async (key) => {
	return await findByKey(key)
}

exports.uploadFile = async (file) => {
	const ex = file.originalname.split('.')[1]
	const key = `${uuid()}.${ex}`

	return await save(key, file.buffer)
}
