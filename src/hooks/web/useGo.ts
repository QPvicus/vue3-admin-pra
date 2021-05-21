import { RouteLocationRaw, Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnums'
import { isString } from '/@/utils/is'

import { useRouter } from 'vue-router'
import { unref } from 'vue'

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }

export function handleError(e: Error) {
  console.error(e)
}

export function useGo(_router?: Router) {
  let router
  if (!_router) {
    router = useRouter()
  }
  const { push, replace } = _router || router
  function go(opt: PageEnum | RouteLocationRaw | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) return
    if (isString(opt)) {
      isReplace ? replace(opt) : push(opt)
    } else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }

  return go
}

export function useRedo(_router?: Router) {
  let router
  if (!_router) {
    router = useRouter()
  }
  const { push, currentRoute } = _router || router
  const { query, params } = currentRoute.value
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      push({
        path: '/redirect' + unref(currentRoute).fullPath,
        query,
        params,
      }).then(() => resolve(true))
    })
  }
  return redo
}
