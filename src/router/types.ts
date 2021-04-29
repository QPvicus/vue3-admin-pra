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

export type AppRouteModule = AppRouteRecordRaw
