import { assign } from 'lodash-unified'

export interface PxToViewportOptions {
  /**
   * 小数精度
   * @default 6
   */
  precision: number
  /**
   * 转换后的单位
   * @default 'vmin'
   */
  unit: 'vw' | 'vh' | 'vmin' | 'vmax'
  /**
   * 设计稿宽度
   * @default 1920
   */
  designWidth: number
}

pxToViewport.defaults = {
  precision: 6,
  unit: 'vmin',
  designWidth: 1920,
} as PxToViewportOptions

/**
 * 数值由 `px` 转为 `viewport` 并携带单位
 *
 * @example
 * ```ts
 * pxToViewport.defaults.unit = 'vw'
 * pxToViewport.defaults.designWidth = 1440
 * pxToViewport.defaults.precision = 4
 *
 * pxToViewport(100)
 * // => '${((100 / 1440) * 100).toFixed(4)}${vw}'
 * ```
 */
export default function pxToViewport(value: number) {
  const opts = assign({}, pxToViewport.defaults)
  return `${((value / opts.designWidth) * 100).toFixed(opts.precision)}${opts.unit}`
}
