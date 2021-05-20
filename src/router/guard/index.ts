import router from '..'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard() {
  createPermissionGuard(router)
}
