getRootFontSize.__rootFontSize__ = 0

/**
 * 获取根元素字体大小，仅初始时获取一次并缓存，若需更新则设置 `forceUpdate` 为 `true`。
 *
 * @example
 * ```ts
 * getRootFontSize()
 * // => 16
 *
 * getRootFontSize(true)
 * // => 14
 * ```
 */
export default function getRootFontSize(forceUpdate = false) {
  if (!getRootFontSize.__rootFontSize__ || forceUpdate) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize
    getRootFontSize.__rootFontSize__ = Number.parseFloat(fontSize)
  }
  return getRootFontSize.__rootFontSize__
}
