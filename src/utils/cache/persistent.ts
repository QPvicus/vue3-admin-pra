import type { UserInfo } from '/#/store'
import { Memory } from './memory'
import {
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
  PRO_CFG_KEY,
  ROLE_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/enums/cacheEnum'
import type { ProjectConfig } from '/#/config'
import { RouteLocationNormalized } from 'vue-router'
import { createLocaleStorage, createSessionStorage } from '.'
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting'
import { toRaw } from '@vue/reactivity'

interface BasicStore {
  [TOKEN_KEY]: string | number | undefined | null
  [USER_INFO_KEY]: UserInfo
  [ROLE_KEY]: string[]
  [PRO_CFG_KEY]: ProjectConfig
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[]
}

// localStorage SessinStorage
type LocalStore = BasicStore
type SessionStore = BasicStore

export type BasicKeys = keyof BasicStore
type LocalKeys = keyof LocalStore
type SessionKeys = keyof SessionStore

const ls = createLocaleStorage()
const ss = createSessionStorage()

const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }
  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false) {
    localMemory.set(key, toRaw(value))
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }
  static removeLocal(key: LocalKeys) {
    localMemory.remove(key)
  }
  static clearLocal() {
    localMemory.clear()
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>
  }
  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false) {
    sessionMemory.set(key, toRaw(value))
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }
  static removeSession(key: SessionKeys) {
    sessionMemory.remove(key)
  }
  static clearSession() {
    sessionMemory.clear()
  }

  static clearAll() {
    sessionMemory.clear()
    localMemory.clear()
  }
}

// when a window is about to close or unload its resource , then cache
window.addEventListener('beforeunload', function () {
  ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
})

function storageChange(e: any) {
  const { key, newValue, oldValue } = e
  if (!key) {
    Persistent.clearAll()
    return
  }
  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal()
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession()
    }
  }
}

// when storage has been modified, then could touch this
window.addEventListener('storage', storageChange)

initPersistentMemory()
