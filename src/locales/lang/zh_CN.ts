import { genMessage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/zh_CN'
import momentLocale from 'moment/dist/locale/zh-cn'

// console.log(normalize('./zh_CN/**.*.ts'))
// console.log(normalize('.\\\\zh_CN\\\\**.*.ts'))
// const path = normalize('.\\\\zh_CN\\\\**.*.ts')

const modules = import.meta.globEager('./zh_CN/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'zh_CN'),
    antdLocale,
  },
  momentLocale,
  momentLocaleName: 'zh-cn',
}
