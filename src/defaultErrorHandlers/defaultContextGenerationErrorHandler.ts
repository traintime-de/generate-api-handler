import { ApiErrorHandler } from '../types'

const defaultContextGenerationErrorHandler: ApiErrorHandler = (
  req,
  res,
  err
) => {
  // Log error
  console.error(err)

  // Send default error response
  const message = `An unknown error occurred whilst generating context required for handling request.`
  res.status(500).json({ message })
}

export default defaultContextGenerationErrorHandler
