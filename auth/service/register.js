const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-southeast-1'
})
const util = require('../utils/util')
const bcrypt = require('bcryptjs')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User2';

async function register(userInfo) {
    const citizenID = userInfo.citizenID;
    const laserID = userInfo.laserID;
    const name = userInfo.name;
    const lastname = userInfo.lastname;
    const dateOfBirth = userInfo.dateOfBirth;
    const religion = userInfo.religion;
    const location = userInfo.location;
    const nationality = userInfo.nationality;

    // validate fields
    if (!citizenID || !laserID || !name || !lastname || !dateOfBirth || !religion || !location || !nationality) {
        return util.buildResponse(401, {
            message: 'All fields are required'
        })
    }

    // check is user already exist
    const dynamoUser = await getUser(citizenID);
    if (dynamoUser && dynamoUser.citizenID) {
        return util.buildResponse(401, {
            message: 'This citizenID already exists in our database'
        })
    }

    // add validate citizenID & laserID
    if (citizenID instanceof String) {
        return util.buildResponse(400, {
            message: 'citizenID must be string'
        })
    }

    if (laserID instanceof String) {
        return util.buildResponse(400, {
            message: 'laserID must be string'
        })
    }

    if (citizenID.length != 13) {
        return util.buildResponse(400, {
            message: 'citizenID\'s length must be 13'
        })
    }

    if (laserID.length != 12) {
        return util.buildResponse(400, {
            message: 'laserID\'s length must be 12'
        })
    }

    const encrytedLaserID = bcrypt.hashSync(laserID.trim(), 10);
    const user = {
        citizenID: citizenID,
        laserID: encrytedLaserID,
        name: name,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
        religion: religion,
        location: location,
        nationality: nationality,
        hasRight: true
    }

    // save data to database
    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return util.buildResponse(503, {
            message: 'Server Error, Please try again later.'
        })
    }

    return util.buildResponse(200, {
        user: user
    })
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

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }

    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error)
    })
}

module.exports.register = register;