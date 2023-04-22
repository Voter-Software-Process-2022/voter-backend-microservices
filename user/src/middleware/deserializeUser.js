import axios from 'axios';

const deserializeUser = (req, res, next) => {
    let accessToken;

    if (req.headers.authorization?.startsWith('Bearer')) {
        accessToken = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.accessToken) {
        accessToken = req.cookies.accessToken
    }

    if (!accessToken) {
        return res.status(401).json({ message: 'You are not logged in'})
    }

    axios.post(`${process.env.AWS_GATEWAY}/verify-token`, {
        token: accessToken
      })
      .then(function (response) {
        res.locals.user = response
      })
      .catch(function (error) {
        return res.status(401).json({ message: 'Error', error: error})
      });

    next()
}

module.exports.deserializeUser = deserializeUser;