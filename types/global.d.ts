declare type Recordable<T extends any = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_USER_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOBAL_APP_TITLE: string
  VITE_GLOBAL_SHORT_NAME: string
  VITE_USE_CDN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
}
