import { AxiosResponse } from 'axios'
import { deepMerge, setObjToUrlParams } from '../..'
import { getToken } from '../../auth'
import { isString } from '../../is'
import { VAxios } from './Axios'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { checkStatus } from './checkStatus'
import { errorResult } from './const'
import { createNow, formateRequestDate } from './helper'
import { RequestOptions, Result } from './type'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '/@/enums/httpEnum'
import { useGlobSetting } from '/@/hooks/setting'
import { useI18n } from '/@/hooks/web/usei18n'
import { useErrorLogStoreWithOut } from '/@/store/modules/errorLog'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage, createErrorModal } = useMessage()
const globSetting = useGlobSetting()
const prefix = globSetting.urlPrefix
/**
 * @description 数据 处理  方便区分多种处理方式
 */
const transform: AxiosTransform = {
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n()
    const { isTransformRequestResult } = options
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) return res.data
    //  错误的时候返回
    const { data } = res
    if (!data) {
      return errorResult
    }

    const { result, code, message } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (!hasSuccess) {
      if (message) {
        if (options.errorMessageMode === 'modal') {
          createErrorModal({ title: t('sys.api.errorTip'), content: message })
        } else if (options.errorMessageMode === 'message') {
          createMessage.error(message)
        }
      }
      Promise.reject(new Error(message))
      return errorResult
    }

    //  请求接口 直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result
    }

    //  请求接口错误
    if (code === ResultEnum.ERROR) {
      if (message) {
        createMessage.error(data.message)
        Promise.reject(new Error(message))
      } else {
        const msg = t('sys.api.errorMessage')
        createMessage.error(msg)
        Promise.reject(new Error(msg))
      }

      return errorResult
    }

    //  登录超时
    if (code === ResultEnum.TIMEOUT) {
      const timeoutMsg = t('sys.api.timeoutMessage')
      createErrorModal({
        title: t('sys.api.operationFailed'),
        content: timeoutMsg,
      })
      Promise.reject(new Error(timeoutMsg))
      return errorResult
    }
    return errorResult
  },
  //  请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamToUrl, joinPrefix, joinTime = true, formatDate } = options
    if (joinPrefix) {
      config.url = `${prefix}${config.url}`
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      // 给 get 请求加上时间戳 避免从缓存中拿数据
      if (!isString(params)) {
        //  is object
        config.params = Object.assign(params || {}, createNow(joinTime, false))
      } else {
        // restful 风格
        config.url = config.url! + params + `${createNow(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formateRequestDate(params)
        config.data = params
        config.params = undefined
        if (joinParamToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data)
        }
      } else {
        //   restful 风格
        config.url = (config.url as string) + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   *@description   请求拦截器
   */
  requestInterceptors: (config) => {
    //  处理拦截器
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },

  /**
   *
   * @description 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n()
    const errorLogStore = useErrorLogStoreWithOut()
    errorLogStore.addAjaxErrorInfo(error)
    const { response, code, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        createMessage.error(t('sys.api.apiTimeoutMessage'))
      }
      if (err.includes('Network Error')) {
        createErrorModal({
          title: t('sys.api.networkException'),
          content: t('sys.api.networkExceptionMsg'),
        })
      }
    } catch (err) {
      throw new Error(err)
    }
    checkStatus(error?.response?.status, msg)
    Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        prefixUrl: prefix,
        headers: {
          'Content-Type': ContentTypeEnum.JSON,
        },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
        },
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios()
