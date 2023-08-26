import { assign } from 'lodash-unified'
import getRootFontSize from '../getRootFontSize'

export interface PxToRemOptions {
  /**
   * 小数精度
   * @default 6
   */
  precision: number
}

pxToRem.defaults = {
  precision: 6,
} as PxToRemOptions

/**
 * 数值由 `px` 转为 `rem` 并携带单位
 *
 * @example
 * ```ts
 * pxToRem.defaults.precision = 4
 * document.documentElement.style.fontSize = '100px'
 *
 * pxToRem(100)
 * // => '1rem'
 * ```
 */
export default function pxToRem(value: number) {
  const opts = assign({}, pxToRem.defaults)
  return `${(value / getRootFontSize()).toFixed(opts.precision)}rem`
}
