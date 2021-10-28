import { NextApiRequest, NextApiResponse } from 'next'

/***********************************************/
/******************* REQUEST *******************/
/***********************************************/

export type ApiRequestHandler<ContextType> = (
  req: NextApiRequest,
  res: NextApiResponse,
  ctx: ContextType
) => Promise<void>

export type WrappedApiRequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

export type ApiContextGenerator<ContextType> = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<ContextType>

export type ApiErrorHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  err: unknown
) => Promise<void>

export type ApiRequestHandlerWrapper = <ContextType>(
  requestHandler: ApiRequestHandler<ContextType>,
  contextGenerator: ApiContextGenerator<ContextType>,
  onContextGenerationError: ApiErrorHandler,
  onRequestHandlingError: ApiErrorHandler
) => WrappedApiRequestHandler

/***********************************************/
/******************** ROUTE ********************/
/***********************************************/

export type ApiMethodType = 'post' | 'get' | 'put' | 'patch' | 'delete'

export type ApiRouteHandler<ContextType> = Record<
  ApiMethodType,
  ApiRequestHandler<ContextType>
>

export type WrappedApiRouteHandler = Record<
  ApiMethodType,
  WrappedApiRequestHandler
>

export type ApiRouteHandlerWrapper = <ContextType>(
  routeHandler: ApiRouteHandler<ContextType>,
  contextGenerator: ApiContextGenerator<ContextType>,
  onContextGenerationError: ApiErrorHandler,
  onRequestHandlingError: ApiErrorHandler
) => WrappedApiRouteHandler

/***********************************************/
/****************** GENERATOR ******************/
/***********************************************/

export type ApiHandlerConfig<ContextType> = {
  routeHandler: ApiRouteHandler<ContextType>
  contextGenerator: ApiContextGenerator<ContextType>
  onContextGenerationError: ApiErrorHandler
  onRequestHandlingError: ApiErrorHandler
}

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

export type ApiHandlerGenerator = <ContextType>(
  config: ApiHandlerConfig<ContextType>
) => ApiHandler
