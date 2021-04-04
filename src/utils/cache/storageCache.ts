import { AesEncryption, EncryptionParams } from '../cipher'
import { isNullOrUndef } from '../is'
import { cacheCipher } from '/@/settings/encryptionSetting'

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string
  storage: Storage
  hasEncrypt: boolean
  timeout?: Nullable<number>
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
  }

  const encryption = new AesEncryption({ key, iv })

  const webStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string
    private encryption: AesEncryption
    private hasEncrypt: boolean
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
      this.encryption = encryption
      this.hasEncrypt = hasEncrypt
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null,
      })

      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
      this.storage.setItem(this.getKey(key), stringifyValue)
    }

    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
        const data = JSON.parse(decVal)
        const { value, expire } = data
        if (isNullOrUndef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (err) {
        return def
      }
    }
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    clear(): void {
      this.storage.clear()
    }
  }

  return new webStorage()
}
