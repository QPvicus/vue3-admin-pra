/**
 *  @description Menu Type
 */
export enum MenuTypeEnum {
  //  left menu
  SIDEBAR = 'sidebar',

  MIX_SIDEBAR = 'mix-sidebar',
  MIX = 'mix',
  TOP_MENU = 'top-menu',
}

export enum TriggerEnum {
  NONE = 'NONE',
  FOOTER = 'FOOTER',
  HEADER = 'HEADER',
}

//  Menu mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
