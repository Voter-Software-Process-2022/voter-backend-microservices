const jwt = require('jsonwebtoken')

function generateToken(userInfo) {
    if (!userInfo) {
        return null;
    }

    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

function verifyToken(citizenID, token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }

        if (response.citizenID !== citizenID) {
            return {
                verified: false,
                message: 'invalid user'
            }
        }

        return {
            verified: true,
            message: 'verified'
        }
    })
}

function jwtVerify(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                success: false,
                message: 'invalid token'
            }
        }

        return {
            success: true,
            user: response
        }
    })
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
module.exports.jwtVerify = jwtVerify;

