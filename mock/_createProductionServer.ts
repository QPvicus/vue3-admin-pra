import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.globEager('./**/*.ts')
const mockModules: any[] = []
console.log(modules, 'modules')
Object.keys(modules).forEach((key) => {
  // exclude ./_utils
  if (key.includes('/_')) return
  mockModules.push(...modules[key].default)
})

console.log(mockModules)
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
