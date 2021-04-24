import { PageEnum } from '/@/enums/pageEnums'
import { useI18n } from '/@/hooks/web/usei18n'
import router from '/@/router'

const error = function (str: string) {}
export function checkStatus(status: number, msg: string): void {
  const { t } = useI18n()
  switch (status) {
    case 400:
      error(`${msg}`)
      break
    case 401:
      error(t('sys.api.errMsg401'))
      router.push(PageEnum.BASE_LOGIN)
      break
    case 403:
      console.error(t('sys.api.errMsg403'))
      break
    case 404:
      error(t('sys.api.errMsg404'))
      break
    case 405:
      error(t('sys.api.errMsg405'))
      break
    case 408:
      error(t('sys.api.errMsg408'))
      break
    case 500:
      error(t('sys.api.errMsg500'))
      break
    case 501:
      error(t('sys.api.errMsg501'))
      break
    case 502:
      error(t('sys.api.errMsg502'))
      break
    case 503:
      error(t('sys.api.errMsg503'))
      break
    case 504:
      error(t('sys.api.errMsg504'))
      break
    case 505:
      error(t('sys.api.errMsg505'))
      break
    default:
  }
}
