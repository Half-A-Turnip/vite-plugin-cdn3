import path from 'path'
import fs from 'fs'
import os from 'os'
import process from 'process'
import MagicString from 'magic-string'
import AggregateError from '@nolyfill/es-aggregate-error'
import { ModuleInfo } from './interface'

export function lookup(entry: string, target: string, ignorePackagePatterns: string[] = ['node_modules/*/dist', 'node_modules/*/build']): string {
  // 防止无限递归，当到达文件系统根目录时停止
  if (entry === '/' || entry === '.' || entry === '') {
    throw new Error(`Could not find ${target} in the project`)
  }
  
  const dir = path.dirname(entry)
  const targetFile = path.join(dir, target)
  
  // 检查当前路径是否应该被忽略
  const shouldIgnore = ignorePackagePatterns.some(pattern => {
    if (pattern.includes('*')) {
      // 简单的通配符匹配
      const [prefix, suffix] = pattern.split('*')
      return dir.includes(prefix) && dir.includes(suffix)
    }
    return dir.includes(pattern)
  })
  
  if (fs.existsSync(targetFile) && !shouldIgnore) {
    // 验证package.json是否为主package.json(可选)
    if (target === 'package.json') {
      try {
        const pkg = JSON.parse(fs.readFileSync(targetFile, 'utf8'))
        // 主package.json通常有name字段
        if (pkg.name) {
          return targetFile
        }
        // 否则继续查找
      } catch (e) {
        // 读取失败则继续查找
      }
    } else {
      return targetFile
    }
  }
  
  // 继续在父目录中查找
  return lookup(dir, target, ignorePackagePatterns)
}


export function len<T extends ArrayLike<unknown>>(source: T) {
  return source.length
}

export function isSupportThreads(): [boolean, string] {
  const [major, minor] = process.versions.node.split('.')
  if (+major < 12 || (+major === 12 && +minor < 17) || (+major === 13 && +minor < 13)) {
    return [false, `${major}.${minor}`]
  }
  return [true, `${major}.${minor}`]
}

export function is(condit: boolean, message: string) {
  if (!condit) {
    throw new Error(message)
  }
}

// TODO 
// If we find the correct dynamic import handing it should be removed.
export const _import = new Function('specifier', 'return import(specifier)')

export function transformCJSRequire(code: string, extenrals: Record<string, ModuleInfo>) {
  const s = new MagicString(code)
  for (const externalModule in extenrals) {
    const reg = new RegExp(`require\\((["'\`])\\s*${externalModule}\\s*(\\1)\\)`, 'g')
    s.replace(reg, extenrals[externalModule].global)
  }
  return { code: s.toString(), map: s.generateMap() }
}

export const MAX_CONCURRENT = (() => {
  //  https://github.com/nodejs/node/issues/19022
  const cpus = os.cpus() || { length: 1 }
  return Math.max(1, cpus.length - 1)
})()

class Queue {
  maxConcurrent: number
  queue: Array<() => Promise<void>>
  running: number
  errors: Error[]
  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent
    this.queue = []
    this.running = 0
    this.errors = []
  }

  enqueue(task: () => Promise<void>) {
    this.queue.push(task)
    this.run()
  }

  async run() {
    while (this.running < this.maxConcurrent && this.queue.length) {
      const task = this.queue.shift()
      this.running++
      try {
        await task?.()
      } catch (err) {
        this.errors.push(err)
      } finally {
        this.running--
        this.run()
      }
    }
  }

  async wait() {
    while (this.running) {
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
    if (len(this.errors)) {
      throw new AggregateError(this.errors, 'failed')
    }
  }
}

export function createConcurrentQueue(max: number) {
  return new Queue(max)
}
