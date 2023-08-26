import { assign } from 'lodash-unified'
import isClient from '../isClient'

getWindowSize.__size__ = {
  width: 0,
  height: 0,
}

getWindowSize.__initialed__ = false

function update() {
  const size = getWindowSize.__size__
  size.width = window.innerWidth
  size.height = window.innerHeight
}

/**
 * 获取窗口尺寸
 *
 * @example
 * ```ts
 * getWindowSize()
 * // => { width: 1920, height: 1080 }
 * ```
 */
export default function getWindowSize() {
  if (isClient() && !getWindowSize.__initialed__) {
    getWindowSize.__initialed__ = true
    update()

    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update, { passive: true })
  }
  return assign({}, getWindowSize.__size__)
}
