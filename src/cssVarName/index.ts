/**
 * `cssVarName` 工厂函数
 *
 * @example
 * ```ts
 * const varName = cssVarNameFactory('el', true)
 *
 * varName('color')
 * // => 'var(--el-color)'
 * ```
 */
export function cssVarNameFactory(namespace = '', useVar = false) {
  const fn = (name: string, _useVar = useVar) => {
    const varName = `--${[namespace, name].filter(Boolean).join('-')}`
    return _useVar ? `var(${varName})` : varName
  }
  return fn as <T extends string>(name: T, useVar?: boolean) => T extends string ? `--${T}` : T
}

/**
 * 获取 `CSS` 变量名称
 *
 * @example
 * ```ts
 * cssVarName('color')
 * // => '--color'
 *
 * cssVarName('bg', true)
 * // => 'var(--bg)'
 * ```
 */
const cssVarName = cssVarNameFactory()
export default cssVarName
