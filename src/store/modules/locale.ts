import store from '/@/store'
import { VuexModule, Mutation, Action, Module, getModule } from 'vuex-module-decorators'
import { localeSetting } from '/@/settings/localeSetting'
import { LocaleSetting, LocaleType } from '/#/config'
import { createLocaleStorage } from '/@/utils/cache'
import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'
const NAME = 'app-locale'

const ls = createLocaleStorage()
const lsSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

hotModuleUnregisterModule(NAME)
@Module({ dynamic: true, store, name: NAME, namespaced: true })
export default class Locale extends VuexModule {
  private info: LocaleSetting = lsSetting

  get getShowPicker(): boolean {
    return !!this.info?.showPicker
  }

  get getLocale(): LocaleType {
    return this.info?.locale
  }

  @Mutation
  setLocaleInfo(info: Partial<LocaleSetting>): void {
    this.info = { ...this.info, ...info }
    ls.set(LOCALE_KEY, this.info)
  }

  @Action
  initLocaleInfo() {
    this.setLocaleInfo({
      ...localeSetting,
      ...this.info,
    })
  }
}

export const localeStore = getModule<Locale>(Locale)
