import type { Recordable } from '@neucloud/types-base'
import { cssVarNameFactory } from '../cssVarName'

/**
 * 转换对象属性为 `CSS` 变量
 *
 * @example
 * ```ts
 * cssVar({ color: 'red', 'bg-color': 'black' })
 * // => { '--color': 'red', '--bg-color': 'black' }
 *
 * cssVar({ color: 'red' }, 'el')
 * // => { '--el-color': 'red' }
 * ```
 */
export default function cssVar<T extends Recordable>(object: T, namespace = '') {
  const varName = cssVarNameFactory(namespace)
  const styles: Recordable = {}

  for (const key in object) if (object[key] != null) styles[varName(key)] = object[key]

  return styles as { [K in keyof T as K extends string ? `--${K}` : K]: T[K] }
}
