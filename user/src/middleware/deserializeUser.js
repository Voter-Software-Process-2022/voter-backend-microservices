import axios from 'axios'

export const deserializeUser = async (req, res, next) => {
  let accessToken

  if (req.headers.authorization?.startsWith('Bearer')) {
    accessToken = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.accessToken) {
    accessToken = req.cookies.accessToken
  }

  if (!accessToken) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  const response = await axios.post(
    `${process.env.AWS_GATEWAY}/verify-token`,
    {
      token: accessToken,
    },
    {
      headers: {
        'x-api-key': process.env.AWS_API_KEY,
      },
    },
  )

  if (!response) {
    return res.status(401).json({ message: 'Error', error: error })
  }

  res.locals.user = response.data
  next()
}
