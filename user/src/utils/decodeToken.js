export const decodeToken = (token, secretKey) => {
  return true
  // try {
  //   const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] })
  //   console.log(decoded)
  //   return decoded
  // } catch (err) {
  //   console.error('JWT validation failed:', err)
  //   return null
  // }
}
