const { createCandidate, findCandidateById, findAllCandidates } = require('../services/candidate.service')
const { BUCKET_CONFIG } = require('../utils/config')

exports.createCandidateHandler = async (req, res) => {
	const requestBody = req.body
	const body = {
		name: requestBody.name,
		pictureKey: requestBody.picture_key,
		areaId: requestBody.area_id,
		partyId: requestBody.party_id,
	}

	const { err } = await createCandidate(body)
	if (err) {
		return res.status(500).json({ error: err })
	}

	return res.status(200).json({ message: 'Candidate created successfully' })
}

exports.getCandidateByIdHandler = async (req, res) => {
	const id = req.params.id

	const { data, err } = await findCandidateById(id)
	if (err) {
		return res.status(500).json({ error: err })
	}

	return res.status(200).json({ data })
}

exports.getAllCandidatesHandler = async (_, res) => {
	console.log(`*** AccessKey = ${BUCKET_CONFIG.AccessKeyId}`)
	console.log(`*** SecretKey = ${BUCKET_CONFIG.SecretAccessKey}`)
	const { data, err } = await findAllCandidates()
	if (err) {
		return res.status(500).json({ error: err })
	}

	return res.status(200).json({ data })
}
