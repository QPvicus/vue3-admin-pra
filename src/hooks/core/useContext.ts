import { provide, inject, InjectionKey, reactive, readonly as defineReadonly, UnwrapRef } from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

export type ShallowUnwrap<T> = {
  [p in keyof T]: UnwrapRef<T[p]>
}

export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options
  const state = reactive(context)
  const provideDate = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideDate)
  return {
    state,
  }
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
