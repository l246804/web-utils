import type { AllowNullish } from '@rhao/types-base'
import type { Numeric } from '../isNumeric'
import isNumeric from '../isNumeric'

/**
 * 为数字或字符串数字添加单位，若为 `null` 或 `undefined`，则返回空字符串，其他类型则强转为字符串
 *
 * @example
 * ```ts
 * addUnit(123)
 * // => '123px'
 *
 * addUnit('100', 'vw')
 * // => '100vw'
 *
 * addUnit('100vh')
 * // => '100vh'
 *
 * addUnit(null)
 * // => ''
 *
 * addUnit(true)
 * // => 'true'
 * ```
 */
export default function addUnit(value: AllowNullish<Numeric>, unit = 'px') {
  if (value == null) value = ''
  return isNumeric(value) ? value + unit : String(value)
}
