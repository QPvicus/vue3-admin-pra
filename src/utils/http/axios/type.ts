export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // splicing request parameters to url
  joinParamToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  //  Whether to process the  request result
  isTransformRequestResult?: boolean
  joinPrefix?: boolean
  apiUrl?: string
  errorMessageMode?: ErrorMessageMode
  joinTime?: boolean
  ignoreCancelToken?: boolean
}

export type Result<T = any> = {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}



export interface UploadFileParams {
  data?: Recordable
  name?: string
  file: File | Blob
  fileName?: string
  [key: string]: any
}