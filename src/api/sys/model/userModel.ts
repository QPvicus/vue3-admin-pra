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
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName: string
  desc?: string
}

export interface RoleInfo {
  roleName: string
  value: string
}
export interface LoginResultModel {
  userId: string | number
  role: RoleInfo
  token: string
}
