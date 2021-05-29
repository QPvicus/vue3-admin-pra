declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TargetContext = '_blank' | '_self'

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type RefType<T> = T | null

declare type ComponentElRef<T extends HTMLElement = HTMLDivElement> = {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
