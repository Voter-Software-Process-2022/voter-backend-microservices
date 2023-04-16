import dotenv from 'dotenv'
import fs from 'fs'
import aws from 'aws-sdk'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_KEY

aws.config.update({
	accessKeyId,
	secretAccessKey,
})

const s3 = new aws.S3({
	region,
})

export function getFileStream(fileKey: string) {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	}

	return s3.getObject(downloadParams).createReadStream()
}

export function uploadFile(file: Express.Multer.File) {
	const fileStream = fs.createReadStream(file.path)

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	}

	return s3.upload(uploadParams).promise()
}

export default s3
