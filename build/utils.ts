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
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (err) {
        // const arr = realName.split(',')
        // realName = {}
        // arr.forEach((item, index) => {
        //   if (index % 2 === 0) {
        //     realName[item] = arr[index + 1]
        //   }
        // })
        // console.log(realName, 'realName')
      }
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
