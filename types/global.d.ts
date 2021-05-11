declare type Recordable<T extends any = any> = Record<string, T>

declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

declare type Nullable<T> = T | null
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare type TimeoutHandler = ReturnType<typeof setTimeout>
declare type IntervalHandler = ReturnType<typeof setInterval>
declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_SHORT_NAME: string
  VITE_USE_CDN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
}
