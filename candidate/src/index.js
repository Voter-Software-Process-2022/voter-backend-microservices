require('dotenv').config()
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const {
	createCandidateHandler,
	getAllCandidatesHandler,
	getCandidateByIdHandler,
} = require('./handlers/candidate.handler')
const { uploadImageFile } = require('./handlers/file.handler')

const storage = multer.memoryStorage()

const fileFilter = (_, file, cb) => {
	if (file.mimetype.split('/')[0] === 'image') {
		cb(null, true)
	} else {
		cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false)
	}
}

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 1000000000, files: 1 },
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/candidates', getAllCandidatesHandler)
app.get('/candidates/:id', getCandidateByIdHandler)
app.post('/candidates', createCandidateHandler)

app.post('/attachments', upload.single('image'), uploadImageFile)

app.listen(4001, () => console.log('Server is running on port 4001'))
