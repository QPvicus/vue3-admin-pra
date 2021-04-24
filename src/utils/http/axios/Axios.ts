import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { cloneDeep } from 'lodash-es'
import qs from 'qs'
import { isFunction } from '../../is'
import { AxiosCancel } from './axiosCancel'
import { CreateAxiosOptions } from './AxiosTransform'
import { errorResult } from './const'
import { RequestOptions, Result, UploadFileParams } from './type'
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum'

export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setInterceptors()
  }
  /**
   * @description Create Axios Instance
   * @param config
   */
  private createAxios(config: CreateAxiosOptions) {
    this.axiosInstance = axios.create(config)
  }
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  configAxios(config: CreateAxiosOptions) {
    if (!this.options) {
      return
    }
    this.createAxios(config)
  }

  setHeader(headers: any) {
    if (!this.axiosInstance) return
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }
  private setInterceptors() {
    const transform = this.getTransform()
    if (!transform) return
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptorsCatch,
      responseInterceptors,
    } = transform
    const axiosCanceler = new AxiosCancel()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken },
      } = config

      const ignoreCancel =
        ignoreCancelToken !== 'undefined'
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }
      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    responseInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  // File Upload
  updateFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return
        const value = params.data[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }
        formData.append(key, params.data[key])
      })
    }

    formData.append(params.name || 'file', params.file, params.fileName)

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    })
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers
    const contentType = headers?.['Content-type'] || headers?.['content-type']
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config?.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'get' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'post' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            const ret = transformRequestHook(res, opt)
            ret !== errorResult ? resolve(ret) : reject(new Error('request error'))
            return
          }

          resolve((res as unknown) as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e))
            return
          }
          reject(e)
        })
    })
  }
}
