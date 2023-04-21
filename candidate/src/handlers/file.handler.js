const { uploadFile } = require('../services/file.service')

exports.uploadImageFile = async (req, res) => {
	const file = req.file
	const results = await uploadFile(file)
	if (results instanceof Error) {
		return res.status(400).json({
			error: results.message,
		})
	}

	return res.status(200).json(results)
}
