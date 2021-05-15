declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TargetContext = '_blank' | '_self'

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
