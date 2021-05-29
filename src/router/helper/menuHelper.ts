import { Menu, MenuModule } from '../types'
import { findPath } from '/@/utils/helper/treeHelper'
import { isUrl } from '/@/utils/is'

export function getAllParentPath<T extends Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((m) => m.path)
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu.children && menu.children.length > 0) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule
  const menuList = [menu]
  joinParentPath(menuList)
  return menuList[0]
}
