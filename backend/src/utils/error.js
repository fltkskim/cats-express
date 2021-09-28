exports.throwError = async (status, message) => {
  const err = new Error(message)
  err.status = status
  err.timestamp = new Date().toISOString()
  err.success = false
  throw err
}