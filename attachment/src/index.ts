import express, { Request, Response } from 'express'
import multer from 'multer'
import { getFileStream, uploadFile } from './services/file.service'

const port = 3001

const app = express()
const upload = multer({ dest: 'uploads/' })

app.get('/attachments/:key', (req: Request, res: Response) => {
	const key = req.params.key
	const readStream = getFileStream(key)

	readStream.pipe(res)
})

app.post('/attachments', upload.single('image'), async (req: Request, res: Response) => {
	const file: Express.Multer.File = req.file
	try {
		const result = await uploadFile(file)
		res.status(200).json({ imagePath: `http://localhost:${port}/attachments/${result.Key}` })
	} catch (error) {
		res.status(500).json(error)
	}
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
