import { getAllParentPath } from '../helper/menuHelper'
import { PermissionModeEnum } from '/@/enums/appEnums'
import type { Menu, MenuModule } from '/@/router/types'
import { useAppStoreWithOut } from '/@/store/modules/app'
import { usePermission } from '/@/store/modules/permission'
import router from '..'

const modules = import.meta.globEager('./modules/**/*.ts')

const menuModules: MenuModule[] = []

Object.keys(modules).forEach((key) => {
  const module = modules[key].default || {}
  const modList = Array.isArray(module) ? [...module] : [module]
  menuModules.push(...modList)
})

const isBackMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK
}

const staticMenus: Menu[] = []

async function getAsyncMenus() {
  const permissionStore = usePermission()
  return !isBackMode() ? staticMenus : permissionStore.getBackMenuList
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  const routes = router.getRoutes()
  return !isBackMode() ? menus : menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

//  get children of the menu
export async function getChildrenMenus(parentPath: string) {}
