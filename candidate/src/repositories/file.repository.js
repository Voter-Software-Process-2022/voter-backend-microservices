const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { BUCKET_CONFIG } = require('../utils/config')

const s3client = new S3Client({
	credentials: {
		accessKeyId: BUCKET_CONFIG.AccessKeyId,
		secretAccessKey: BUCKET_CONFIG.SecretAccessKey,
	},
	region: BUCKET_CONFIG.Region,
})

const bucket = BUCKET_CONFIG.Name

exports.findByKey = async (key) => {
	const getCommand = new GetObjectCommand({
		Bucket: bucket,
		Key: `attachments/${key}`,
	})

	try {
		const url = await getSignedUrl(s3client, getCommand, { expiresIn: 900 })
		return url.split('?')[0]
	} catch (error) {
		console.log(error)
		return error
	}
}

exports.save = async (key, body) => {
	const uploadCommand = new PutObjectCommand({
		Bucket: bucket,
		Key: `attachments/${key}`,
		Body: body,
	})

	try {
		await s3client.send(uploadCommand)
		return { key: key }
	} catch (error) {
		console.log(error)
		return error
	}
}
