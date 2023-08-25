import { assign } from 'lodash-unified'

export interface PxWithRatioOptions {
  /**
   * 实际宽度
   * @default document.documentElement.offsetWidth
   */
  realWidth: number
  /**
   * 设计稿宽度
   * @default 1920
   */
  designWidth: number
  /**
   * 小数精度
   * @default 6
   */
  precision: number
}

pxWithRatio.defaults = {
  realWidth: document.documentElement.offsetWidth,
  designWidth: 1920,
  precision: 6,
}

/**
 * 数值由 `px` 基于当前屏幕和设计稿比例进行计算
 *
 * @example
 * ```ts
 * pxWithRatio.defaults.realWidth = 1000
 * pxWithRatio.defaults.designWidth = 1920
 * pxWithRatio.defaults.precision = 6
 *
 * pxWithRatio(100)
 * // => +((1000 / 1920) * 100).toFixed(6)
 * ```
 */
export default function pxWithRatio(value: number) {
  const opts = assign({}, pxWithRatio.defaults)
  return +((opts.realWidth / opts.designWidth) * value).toFixed(opts.precision)
}
