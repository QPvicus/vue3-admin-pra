import type { App } from 'vue'

import { createPinia } from 'pinia'

const store = createPinia()

export function setStore(app: App) {
  app.use(store)
}
export { store }
