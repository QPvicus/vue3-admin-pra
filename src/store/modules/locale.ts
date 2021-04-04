import store from '/@/store'
import { VuexModule, Mutation, Action, Module, getModule } from 'vuex-module-decorators'
import { localeSetting } from '/@/settings/localeSetting'
import { LocaleSetting, LocaleType } from '/#/config'

const NAME = 'app-locale'

@Module({ dynamic: true, store, name: NAME, namespaced: true })
export default class Locale extends VuexModule {
  private info = localeSetting

  get getShowPicker(): boolean {
    return !!this.info?.showPicker
  }

  get getLocale(): LocaleType {
    return this.info?.locale
  }

  @Mutation
  setLocaleInfo(info: Partial<LocaleSetting>): void {
    this.info = { ...this.info, ...info }
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
