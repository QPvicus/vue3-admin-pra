import { defineStore } from 'pinia'
import { store } from '..'
import { ErrorLogInfo } from '/#/store'
import { formatToDateTime } from '/@/utils/dateUtils'
import projectSetting from '/@/settings/projectSetting'
import { ErrorTypeEnum } from '/@/enums/exceptionEnum'
export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>
  errorLogListCount: number
}

export const useErrorLogStore = defineStore({
  id: 'app-error-log',
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList() {
      return this.errorLogInfoList || []
    },
    getErrorLogListCount() {
      return this.errorLogListCount
    },
  },
  actions: {
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      }
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])]
      this.errorLogListCount += 1
    },
    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count
    },
    addAjaxErrorInfo(error) {
      const { useErrorHandler } = projectSetting
      if (!useErrorHandler) return
      const errorInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      }
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response
        errorInfo.url = url
        errorInfo.name = 'Ajax Error'
        errorInfo.file = '-'
        errorInfo.stack = JSON.stringify(data)
        errorInfo.detail = JSON.stringify({ params, method, headers })
      }
      this.addErrorLogInfo(errorInfo as ErrorLogInfo)
    },
  },
})

export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store)
}
