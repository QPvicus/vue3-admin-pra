import { LocaleType } from '/#/config'

import moment from 'moment'

import { i18n } from './setupi18n'
import { localeStore } from '/@/store/modules/locale'

interface LangModule {
  message: Recordable
  messageLocale: Recordable
  messageLocaleName: string
}

const loadLocalePool: LocaleType[] = []

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function useLocale() {}
