import { ErrorTypeEnum } from '/@/enums/exceptionEnum'

export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  desc?: string
}

export interface ErrorLogInfo {
  type: ErrorTypeEnum
  file: string
  name?: string
  message: string
  stack?: string
  detail: string
  url: string
  time?: string
}
