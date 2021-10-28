import { ApiMethodType, ApiRequestHandler } from '../types'

const wrapRouteHandler = (routeHandler, onError) => {
  Object.entries(routeHandler).map(([key, value]) => {
    const methodType: ApiMethodType = key
    const requestHandler: ApiRequestHandler = value

    const wrappedMethodHandler = wrapMethodHandler()
  })
}

export default wrapRouteHandler
