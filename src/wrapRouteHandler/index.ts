import {
  ApiContextGenerator,
  ApiErrorHandler,
  ApiRouteHandler,
  ApiRouteHandlerWrapper,
  WrappedApiRequestHandler,
  WrappedApiRouteHandler,
} from '../types'
import wrapRequestHandler from './wrapRequestHandler'

const wrapRouteHandler: ApiRouteHandlerWrapper = <ContextType>(
  routeHandler: ApiRouteHandler<ContextType>,
  contextGenerator: ApiContextGenerator<ContextType>,
  onContextGenerationError: ApiErrorHandler,
  onRequestHandlingError: ApiErrorHandler
) => {
  const wrappedRouteHandlerEntries = Object.entries(routeHandler).map<
    [string, WrappedApiRequestHandler]
  >(([methodType, requestHandler]) => {
    const wrappedRequestHandler = wrapRequestHandler<ContextType>(
      requestHandler,
      contextGenerator,
      onContextGenerationError,
      onRequestHandlingError
    )
    return [methodType, wrappedRequestHandler]
  })
  const wrappedRouteHandler = Object.fromEntries<WrappedApiRequestHandler>(
    wrappedRouteHandlerEntries
  )
  return wrappedRouteHandler as WrappedApiRouteHandler
}

export default wrapRouteHandler
