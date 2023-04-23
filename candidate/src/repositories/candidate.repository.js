const { DynamoDBClient, PutItemCommand, ScanCommand, QueryCommand } = require('@aws-sdk/client-dynamodb')
const { DB_CONFIG } = require('../utils/config')

const dynamoDBClient = new DynamoDBClient({ region: DB_CONFIG.Region })
const TableName = 'Candidate'

exports.create = async (item) => {
	const params = {
		TableName: TableName,
		Item: {
			id: { N: item.id.toString() },
			name: { S: item.name },
			pictureUrl: { S: item.pictureUrl },
			areaId: { N: item.areaId.toString() },
			partyId: { N: item.partyId.toString() },
		},
	}

	try {
		const data = await dynamoDBClient.send(new PutItemCommand(params))
		return { data, err: null }
	} catch (err) {
		console.log(err)
		return { data: null, err }
	}
}

exports.count = async () => {
	const params = {
		TableName: TableName,
		Select: 'COUNT',
	}

	try {
		const data = await dynamoDBClient.send(new ScanCommand(params))
		return { data: data.Count, err: null }
	} catch (err) {
		console.log(err)
		return { data: null, err }
	}
}

exports.findAll = async () => {
	const params = {
		TableName: TableName,
	}

	try {
		const data = await dynamoDBClient.send(new ScanCommand(params))
		data.Items.sort((a, b) => a.id.N - b.id.N)
		const candidateResponse = data.Items.map((item) => {
			return {
				id: parseInt(item.id.N),
				name: item.name.S,
				pictureUrl: item.pictureUrl.S,
				area_id: parseInt(item.areaId.N),
				party_id: parseInt(item.partyId.N),
			}
		})

		return { data: candidateResponse, err: null }
	} catch (err) {
		console.log(err)
		return { data: null, err }
	}
}

exports.findById = async (id) => {
	const params = {
		TableName: TableName,
		KeyConditionExpression: 'id = :id',
		ExpressionAttributeValues: {
			':id': { N: id.toString() },
		},
	}

	try {
		const data = await dynamoDBClient.send(new QueryCommand(params))

		const item = data.Items[0]
		const candidateResponse = {
			id: parseInt(item.id.N),
			name: item.name.S,
			pictureUrl: item.pictureUrl.S,
			area_id: parseInt(item.areaId.N),
			party_id: parseInt(item.partyId.N),
		}

		return { data: candidateResponse, err: null }
	} catch (err) {
		console.log(err)
		return { data: null, err }
	}
}
