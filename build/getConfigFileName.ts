/**
 * get the configuration file variable name
 * @param env
 * @returns
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION${env.VITE_GLOBAL_APP_SHORT_NAME || '_APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}
