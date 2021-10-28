import { NextApiRequest, NextApiResponse } from 'next'

/***********************************************/
/*************** REQUEST HANDLER ***************/
/***********************************************/

export type ApiRequestHandler<ContextType> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: ContextType
) => Promise<void>

export type WrappedApiRequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void

export type ApiContextGenerator<ContextType> = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<ContextType>

export type ApiErrorHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  err: unknown
) => void

export type ApiRequestHandlerWrapper = <ContextType>(
  requestHandler: ApiRequestHandler<ContextType>,
  contextGenerator: ApiContextGenerator<ContextType>,
  onContextGenerationError: ApiErrorHandler,
  onRequestHandlingError: ApiErrorHandler
) => WrappedApiRequestHandler

/***********************************************/
/**************** ROUTE HANDLER ****************/
/***********************************************/

export type ApiMethodType = 'post' | 'get' | 'put' | 'patch' | 'delete'

export type ApiRouteHandler = Record<ApiMethodType, ApiRequestHandler>

export type WrappedApiRouteHandler<ContextType> = Record<
  ApiMethodType,
  WrappedApiRequestHandler<ContextType>
>

export type ApiConfig = {
  routeHandler: ApiRouteHandler
  onError: ApiErrorHandler
}

export type ApiHandlerGenerator = (apiConfig: ApiConfig) => ApiRequestHandler
