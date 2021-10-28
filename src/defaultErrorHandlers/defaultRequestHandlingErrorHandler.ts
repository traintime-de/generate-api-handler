import { ApiErrorHandler } from '../types'

const defaultRequestHandlingErrorHandler: ApiErrorHandler = (req, res, err) => {
  // Log error
  console.error(err)

  // Send default error response
  const { url, method } = req
  const message = `An unknown error occurred whilst handling ${method} request to ${url}.`
  res.status(500).json({ message })
}

export default defaultRequestHandlingErrorHandler
