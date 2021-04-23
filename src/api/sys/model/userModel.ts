import { RoleEnum } from '/@/enums/roleEnum'

/**
 *  @description Login interface parameter
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * @description Get User information
 */
export interface getUserInfoByIdParams {
  userId: string | number
}

export interface GetUserInfoByUserIdModel {
  roles: RoleEnum[]
  userId: string | number
  username: string
  realName: string
  desc?: string
}
