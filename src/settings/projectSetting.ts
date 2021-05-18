import { CacheTypeEnum } from '/@/enums/cacheEnum'
import { ProjectConfig } from '/#/config'
import { primaryColor } from '../../build/config/themeConfig'
import { PermissionModeEnum, ThemeEnum } from '../enums/appEnums'
import { SIDE_BAR_BG_COLOR_LIST } from './designSetting'
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '../enums/menuEnum'

const setting: ProjectConfig = {
  permissionCacheTpe: CacheTypeEnum.LOCAL,
  // Use error-handler-plugin
  useErrorHandler: false,

  showDarkModeToggle: true,

  showSettingButton: true,

  themeColor: primaryColor,

  showLogo: true,

  permissionMode: PermissionModeEnum.ROLE,

  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    collapsed: true,
    collapsedShowTitle: false,
    canDrag: false,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    split: false,
    topMenuAlign: 'center',
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false,
  },

  grayMode: false,

  colorWeek: false,
}

export default setting
