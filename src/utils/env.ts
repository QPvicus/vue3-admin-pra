import { getConfigFileName } from '../../build/getConfigFileName'
import { warn } from './log'
import type { GlobEnvConfig } from '/#/config'
import pkg from '../../package.json'

export function getStorageShortName() {
  //VUE_VBEN_ADMIN__DEVELOPMENT__0.0.0
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}`.toUpperCase()
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  // VUE_VBEN_ADMIN__DEVELOPMENT
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env)
  const ENV = ((import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      ((import.meta.env as unknown) as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown) as GlobEnvConfig
  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV
  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    )
  }

  return {
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  }
}

/**
 * @description: Development model
 */
export const devMode = 'development'

/**
 * @description: Production Model
 */
export const prodMode = 'production'

export function isDevMode(): boolean {
  return import.meta.env.DEV
}

export function getEnv(): string {
  return import.meta.env.MODE
}

export function isProdMode(): boolean {
  return import.meta.env.PROD
}

/**
 * Whether to open mock
 * @returns
 */
export function isUserMock() {
  return import.meta.env.VITE_USE_MOCK === 'true'
}
