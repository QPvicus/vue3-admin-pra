export interface Cache<T = any> {
  value?: T
  timeoutId?: ReturnType<typeof setTimeout>
  time?: number
  alive?: number
}

const NOT_ALIVE = 0

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: Cache<V> } = {}
  private alive: number
  constructor(alive = NOT_ALIVE) {
    this.alive = alive * 1000
  }
  get getCache() {
    return this.cache
  }
  setCache(cache) {
    this.cache = cache
  }

  get<K extends keyof T>(key: K) {
    return this.cache[key]
  }
  set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.cache[key]

    if (!expires || expires <= 0) {
      expires = this.alive
    }
    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId)
        item.timeoutId = undefined
      }
      item.value = value
    } else {
      item = { value, alive: expires }
      this.cache[key] = item
    }

    if (!expires) return value
    const now = new Date().getTime()
    item.time = now + this.alive
    item.timeoutId = setTimeout(
      () => {
        this.remove(key)
      },
      expires > now ? expires - now : expires
    )
    return value
  }

  remove<K extends keyof T>(key: K) {
    const item = this.cache[key]
    Reflect.deleteProperty(this.cache, key)
    if (item) {
      clearTimeout(item.timeoutId!)
      return item.value
    }
  }

  resetCache(cache: { [key in keyof T]: Cache }) {
    Object.keys(cache).forEach((key) => {
      const k = (key as any) as keyof T
      const item = cache[k]
      if (item && item.time) {
        const now = new Date().getTime()
        const expires = item.time
        if (expires > now) {
          this.set(k, item.value, expires)
        }
      }
    })
  }

  clear() {
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key]
      item.timeoutId && clearTimeout(item.timeoutId)
    })
    this.cache = {}
  }
}
