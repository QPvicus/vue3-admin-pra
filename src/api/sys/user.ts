import {
  getUserInfoByIdParams,
  GetUserInfoByUserIdModel,
  LoginParams,
  LoginResultModel,
} from './model/userModel'
import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/@/utils/http/axios/type'

enum Api {
  Login = '/login',
  GetUserInfoById = '/GetUserInfoById',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  )
}

export function getUserByUserId(params: getUserInfoByIdParams) {
  return defHttp.get<GetUserInfoByUserIdModel>({
    url: Api.GetUserInfoById,
    params,
  })
}
