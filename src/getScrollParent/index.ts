import { isElement } from 'lodash-unified'
import type { AllowNullish } from '@rhao/types-base'
import isClient from '../isClient'

export type ScrollElement = HTMLElement | Window

const defaultRoot = (isClient() ? window : undefined) as ScrollElement
const overflowScrollReg = /scroll|auto|overlay/i

/**
 * 获取滚动的祖元素
 */
export default function getScrollParent(
  el?: AllowNullish<Element>,
  root: ScrollElement = defaultRoot,
) {
  let node = el
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) return node
    node = node.parentNode as Element
  }
  return root
}
