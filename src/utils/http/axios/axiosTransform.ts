import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions } from './type'
export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig
  /**
   * @description Request successfully processed
   */
  transformRequestHook?: (res: AxiosResponse, options: RequestOptions) => any

  requestCatchHook?: (error: Error) => Promise<any>

  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  requestInterceptorsCatch?: (error: Error) => void

  responseInterceptorsCatch?: (error: Error) => void
}
