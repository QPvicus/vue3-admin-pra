import type { UserInfo } from '/#/store'

import { defineStore } from 'pinia'
import { RoleEnum } from '/@/enums/roleEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { ROLE_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { GetUserInfoByUserIdModel, LoginParams } from '/@/api/sys/model/userModel'
import { ErrorMessageMode } from '/@/utils/http/axios/type'

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
}

export const useUserState = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // role list
    roleList: [],
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLE_KEY)
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLE_KEY, roleList)
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      setAuthCache(USER_INFO_KEY, info)
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
    },
    // async login(params: LoginParams & {
    //   goHome?: boolean
    //   mode: ErrorMessageMode
    // }): Promise<GetUserInfoByUserIdModel | null> {
    //   try {
    //     const {goHome = true, mode, ...loginParams} = params
    //     const data = await {a: 1}
    //   } catch (error) {
    //     return null
    //   }
    // }
  },
})
