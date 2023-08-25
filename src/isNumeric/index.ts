export type Numeric = string | number

/**
 * 是否为数字或字符串数字
 *
 * @example
 * ```ts
 * isNumeric(123)
 * // => true
 *
 * isNumeric('123')
 * // => true
 * ```
 */
export default function isNumeric(val: string | number) {
  return typeof val === 'number' || /^-?\d+(\.\d+)?$/.test(val)
}
