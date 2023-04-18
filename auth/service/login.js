const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util')
const bcrypt = require('bcryptjs')
const auth = require('../utils/auth')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

async function login(user) {
    const citizenID = user.citizenID;
    const laserID = user.laserID;
    if (!user || !citizenID || !laserID) {
        return util.buildResponse(401, {
            message: 'citizenID and laserID are required' 
        })
    }

    // check is user already exist
    const dynamoUser = await getUser(citizenID);
    if (!dynamoUser && !dynamoUser.citizenID) {
        return util.buildResponse(403, {
            message: 'This citizenID does not exists'
        })
    }

    // if (!bcrypt.compareSync(laserID, dynamoUser.laserID)) {
    //     return util.buildResponse(403, {
    //         message: 'laserID is incorrect'
    //     })
    // }

    if (laserID !== dynamoUser.laserID) {
        return util.buildResponse(403, {
            message: 'laserID is incorrect'
        })
    }

    const userInfo = {
        citizenID: dynamoUser.citizenID,
        laserID: dynamoUser.laserID
    }
    const token = auth.generateToken(userInfo)
    const response = {
        Token: token
    }
    return util.buildResponse(200, response)
}

async function getUser(citizenID) {
    const params = {
        TableName: userTable,
        Key: {
            citizenID: citizenID
        }
    }

    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error)
    })
}

module.exports.login =login;