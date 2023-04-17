const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})
const util = require('../utils/util')
const bcrypt = require('bcryptjs')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

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

    // const encrytedPW = bcrypt.hashSync(laserID.trim(), 10);
    const user = {
        citizenID: citizenID,
        laserID: laserID,  // or encrytedPW
        name: name,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
        religion: religion,
        location: location,
        nationality: nationality
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