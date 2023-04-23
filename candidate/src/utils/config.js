exports.DB_CONFIG = {
	Region: 'ap-southeast-1',
	AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

exports.BUCKET_CONFIG = {
	Name: process.env.AWS_BUCKET_NAME,
	Region: process.env.AWS_BUCKET_REGION,
	AcccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}
