const util = require('../utils/util')
const auth = require('../utils/auth')

function verifyToken(requestBody) {
    if (!requestBody.token) {
        return util.buildResponse(401, {
            verified: false,
            message: 'incorrect request body'
        })
    }

    const token = requestBody.token;
    const deserialized = auth.jwtVerify(token);
    if (!deserialized.success) {
        return util.buildResponse(401, verification);
    }

    return util.buildResponse(200, deserialized.user)
}

module.exports.verifyToken = verifyToken;