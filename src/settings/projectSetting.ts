import { CacheTypeEnum } from '/@/enums/cacheEnum'
import { ProjectConfig } from '/#/config'

const setting: ProjectConfig = {
  permissionCacheTpe: CacheTypeEnum.LOCAL,
  // Use error-handler-plugin
  useErrorHandler: false,
}

export default setting
