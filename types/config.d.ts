import { CacheTypeEnum } from '/@/enums/cacheEnum'

export type LocaleType = 'zh_CN' | 'en'

export interface LocaleSetting {
  showPicker: boolean
  locale: LocaleType
  fallback: LocaleType
  availableLocales: LocaleType[]
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Upload url
  uploadUrl?: string
  //  Service interface url prefix
  urlPrefix?: string
  // Project abbreviation
  shortName: string
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string
}

export interface ProjectConfig {
  permissionCacheTpe: CacheTypeEnum
}
