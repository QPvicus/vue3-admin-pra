import { Menu } from '../types'
import { findPath } from '/@/utils/helper/treeHelper'

export function getAllParentPath<T extends Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((m) => m.path)
}
