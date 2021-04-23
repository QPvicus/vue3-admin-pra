import { BasicKeys, Persistent } from '/@/utils/cache/persistent'
import { CacheTypeEnum, TOKEN_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'

const { permissionCacheTpe } = projectSetting
const isLocal = permissionCacheTpe === CacheTypeEnum.LOCAL

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  fn(key, value, true)
}
