import defaultRequestHandlingErrorHandler from './defaultErrorHandlers/defaultRequestHandlingErrorHandler'
import {
  ApiHandlerGenerator,
  ApiHandlerConfig,
  ApiHandler,
  ApiMethodType,
} from './types'
import wrapRouteHandler from './wrapRouteHandler'

const generateApiHandler: ApiHandlerGenerator = <ContextType>(
  config: ApiHandlerConfig<ContextType>
) => {
  // Deconstruct config
  const {
    routeHandler,
    contextGenerator,
    onContextGenerationError,
    onRequestHandlingError,
  } = config

  // Wrap route handler (with context generator and error handlers)
  const wrappedApiRouteHandler = wrapRouteHandler(
    routeHandler,
    contextGenerator,
    onContextGenerationError,
    onRequestHandlingError
  )

  // Create root request handler
  const apiHandler: ApiHandler = async (req, res) => {
    // Extract method type from request
    const isMethodNullish = (req.method ?? null) === null
    if (isMethodNullish) {
      // TODO: give error message
      throw new Error()
    }
    const method = (req.method as string).toLowerCase() as ApiMethodType

    // Execute wrapped request handler
    const wrappedRequestHandler = wrappedApiRouteHandler[method]
    return wrappedRequestHandler(req, res)
  }

  return apiHandler
}

export default generateApiHandler
