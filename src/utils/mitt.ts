/**
 *  Mitt Tiny functional event emitter
 *
 */

export default class Mitt {
  private cache: Map<string | symbol, Array<(...data: any) => void>>
  constructor(all = []) {
    this.cache = new Map(all)
  }

  once(type: string | symbol, handler: Fn) {
    const decor = (...args: any[]) => {
      handler && handler.apply(this, args)
      this.off(type, decor)
    }
    this.on(type, decor)
    return this
  }

  on(type: string | symbol, handler: Fn) {
    const handlers = this.cache?.get(type)
    const added = handlers && handlers.push(handler)
    if (!added) {
      this.cache.set(type, [handler])
    }
  }
  /**
   * remove an event handler for the given type
   * @param type
   * @param handler
   */
  off(type: string | symbol, handler: Fn): void {
    const handlers = this.cache?.get(type)
    if (handlers) {
      // if  indexOf return -1 =>  -1 >>> 0 => 4000000多 => return []
      handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    }
  }

  emit(type: string | symbol, event?: any) {
    for (const handler of this.cache.get(type) || [].slice()) handler(event)
    for (const handler of this.cache.get('*') || [].slice()) handler(type, event)
  }

  clear() {
    this.cache.clear()
  }
}
