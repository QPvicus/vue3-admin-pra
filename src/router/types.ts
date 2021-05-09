import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'
import { RoleEnum } from '/@/enums/roleEnum'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteMeta {
  title: string
  ignoreAuth?: boolean
  roles?: RoleEnum[]
  ignoreKeepAlive?: boolean
  // Is it fixed on the tab
  affix?: boolean
  icon?: string
  frameSrc?: string
  transitionName?: string
  hideBreadcrumb?: boolean
  hideChildrenMenu?: boolean
  carryParam?: boolean
  single?: boolean
  currentActiveMenu?: string
  hideTab?: boolean
  hideMenu?: boolean
  isLink?: boolean
}

interface _RouteRecordRaw
  extends Omit<
    {
      [key in keyof RouteRecordRaw]: RouteRecordRaw[key]
    },
    'meta'
  > {}
// @ts-ignore
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   name: string
//   meta: RouteMeta
//   component?: Component | string
//   components?: Component
//   children?: AppRouteRecordRaw[]
//   props?: Recordable
//   fullPath?: string
// }

export interface AppRouteRecordRaw extends _RouteRecordRaw {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface MenuTag {
  type?: 'success' | 'error' | 'warn' | 'primary'
  content?: string
  dot?: boolean
}

export interface Menu {
  name: string
  icon?: string
  path: string
  disabled?: boolean
  children?: Menu[]
  orderNo?: number
  roles?: RoleEnum[]
  meta?: Partial<RouteMeta>
  tag?: MenuTag
  hideMenu?: boolean
}

export interface MenuModule {
  //  order number smaller the fronter this is
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw
