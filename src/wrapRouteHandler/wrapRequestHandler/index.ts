import defaultContextGenerationErrorHandler from '../../defaultErrorHandlers/defaultContextGenerationErrorHandler'
import defaultRequestHandlingErrorHandler from '../../defaultErrorHandlers/defaultRequestHandlingErrorHandler'
import {
  ApiContextGenerator,
  ApiErrorHandler,
  ApiRequestHandler,
  ApiRequestHandlerWrapper,
  WrappedApiRequestHandler,
} from '../../types'

const wrapRequestHandler: ApiRequestHandlerWrapper = <ContextType>(
  requestHandler: ApiRequestHandler<ContextType>,
  contextGenerator: ApiContextGenerator<ContextType>,
  onContextGenerationError: ApiErrorHandler,
  onRequestHandlingError: ApiErrorHandler
) => {
  const wrappedRequestHandler: WrappedApiRequestHandler = async (req, res) => {
    // Generate context
    const generateContext: () => Promise<{
      success: boolean
      context: ContextType | null
    }> = async () => {
      try {
        const context = await contextGenerator(req, res)
        return {
          success: true,
          context,
        }
      } catch (err) {
        const handleError =
          onContextGenerationError ?? defaultContextGenerationErrorHandler
        handleError(req, res, err)
        return {
          success: false,
          context: null,
        }
      }
    }
    const { success: wasContextGenerated, context } = await generateContext()
    if (!wasContextGenerated) return

    // Handle request
    const handleRequest = requestHandler
    try {
      handleRequest(req, res, context as ContextType)
    } catch (err) {
      const handleError =
        onRequestHandlingError ?? defaultRequestHandlingErrorHandler
      handleError(req, res, err)
    }
  }
  return wrappedRequestHandler
}

export default wrapRequestHandler
