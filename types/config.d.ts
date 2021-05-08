import { PermissionModeEnum, ThemeEnum } from '/@/enums/appEnums'
import { CacheTypeEnum } from '/@/enums/cacheEnum'
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '/@/enums/menuEnum'

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
  // storage location of permission related information
  permissionCacheTpe: CacheTypeEnum
  //  use error handler plugin
  useErrorHandler: boolean

  //  Whether to show configuration switch button
  showSettingButton: boolean

  // Whether to show show the theme switch button
  showDarkModeToggle: boolean

  // menuSetting
  menuSetting: MenuSetting

  // theme color
  themeColor: string

  // Whether to show logo
  showLogo: boolean

  //  permission mode
  permissionMode: PermissionModeEnum
}

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  collapsed: boolean
  canDrag: boolean // ?
  show: boolean
  hidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  theme: ThemeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  trigger: TriggerEnum
  accordion: boolean
  closeMixSidebarOnChange: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
}
