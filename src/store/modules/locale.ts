import { store } from '/@/store'
import { localeSetting } from '/@/settings/localeSetting'
import { LocaleSetting, LocaleType } from '/#/config'
import { createLocaleStorage } from '/@/utils/cache'
import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { defineStore } from 'pinia'
const ls = createLocaleStorage()
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localeInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localeInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localeInfo?.showPicker
    },
    getLocale(): LocaleType {
      return this.localeInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localeInfo = { ...this.localeInfo, ...info }
      ls.set(LOCALE_KEY, this.localeInfo)
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localeInfo,
      })
    },
  },
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
