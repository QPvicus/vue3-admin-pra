import Mitt from '/@/utils/mitt'

import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '/@/utils'

const mitt = new Mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeTab: RouteLocationNormalized): void {
  const r = getRawRoute(lastChangeTab)
  mitt.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
): void {
  mitt.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener(): void {
  mitt.clear()
}
