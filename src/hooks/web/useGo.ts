import { RouteLocationRaw, Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnums'
import { isString } from '/@/utils/is'

import { useRouter } from 'vue-router'

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
