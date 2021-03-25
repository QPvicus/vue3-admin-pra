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

export function getEnv() {
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
