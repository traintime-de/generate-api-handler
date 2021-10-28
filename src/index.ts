import defaultRequestHandlingErrorHandler from './defaultErrorHandlers/defaultRequestHandlingErrorHandler'
import { ApiHandlerGenerator } from './types'

const generateApiHandler: ApiHandlerGenerator = (apiConfig) => {
  const { requestHandlers, onError } = apiConfig

  const handleApi = async (req, res) => {
    try {
      // TODO: Wrap method handlers
    } catch (err) {
      const handleError = onError ?? defaultRequestHandlingErrorHandler
      handleError(req, res, err)
    }
  }
  return handleApi
}

export default generateApiHandler
