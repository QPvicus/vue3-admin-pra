import type { InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '/@/hooks/core/useContext'

import Mitt from '/@/utils/mitt'

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Mitt
  activeName: Ref<string | number>
}

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol()

export function createSimpleMenuContext(context: SimpleRootMenuContextProps) {
  return createContext(context, key, { readonly: false, native: true })
}

export function useSimpleMenuContext() {
  return useContext<SimpleRootMenuContextProps>(key)
}
