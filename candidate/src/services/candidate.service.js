const { create, count, findById, findAll } = require('../repositories/candidate.repository')
const { getFile } = require('./file.service')

exports.createCandidate = async (item) => {
	const pictureUrl = await getFile(item.pictureKey)
	const { data: id, err } = await count()
	if (err) {
		return { data: null, err: err }
	}

	const newItem = {
		id: id + 1,
		name: item.name,
		pictureUrl: pictureUrl,
		areaId: item.areaId,
		partyId: item.partyId,
	}

	return await create(newItem)
}

exports.findCandidateById = async (id) => {
	return await findById(id)
}

exports.findAllCandidates = async () => {
	return await findAll()
}
