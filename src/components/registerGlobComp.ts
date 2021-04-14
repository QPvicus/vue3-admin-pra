import { Button as AntButton } from 'ant-design-vue'

import { App } from 'vue'

const comList = [AntButton]

export const registerGlobComp = (app: App) => {
  comList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp)
  })
}
