// import fs from 'fs'
import path from 'path'
// import dotenv from 'dotenv'

export function isDevFn(mode: string): boolean {
  return mode === 'development'
}

export function isProdFn(mode: string): boolean {
  return mode === 'production'
}

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    console.log(realName)
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
        console.log('proxy ===', realName)
      } catch (err) {}
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}

// export function createConfig() {}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
