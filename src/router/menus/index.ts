import type { MenuModule } from '/@/router/types'

const modules = import.meta.globEager('./modules/**/*.ts')

const menuModules: MenuModule[] = []

Object.keys(modules).forEach((key) => {
  const module = modules[key].default || {}
  const modList = Array.isArray(module) ? [...module] : [module]
  menuModules.push(...modList)
})
