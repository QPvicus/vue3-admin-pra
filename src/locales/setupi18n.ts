import type { App } from 'vue'
import type { I18nOptions, I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

import { localeStore } from '/@/store/modules/locale'
import { localeSetting } from '/@/settings/localeSetting'

export let i18n: ReturnType<typeof createI18n>

const { fallback, availableLocales } = localeSetting
async function createI18nOptions(): Promise<I18nOptions> {
  const locale = localeStore.getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default?.message ?? {}
  return {
    locale,
    legacy: false,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales,
    sync: false,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export async function setI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
