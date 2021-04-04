import { getStorageShortName } from '/@/utils/env'
import { createStorage as create, CreateStorageParams } from './storageCache'
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '/@/settings/encryptionSetting'

export type Options = Partial<CreateStorageParams>

export const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const webStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return createOptions(storage, options)
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}
export const createLocaleStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}
