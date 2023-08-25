import type { MaybeGetter } from '@rhao/types-base'
import { toValue } from '@rhao/lodash-x'
import { assign } from 'lodash-unified'

export interface CreateBEMOptions {
  /**
   * 命名空间
   * @default ''
   */
  namespace: MaybeGetter<string>
  /**
   * 状态前缀
   * @default 'is-'
   */
  statePrefix: string
}

createBEM.defaults = {
  namespace: '',
  statePrefix: 'is-',
} as CreateBEMOptions

function _bem(namespace = '', block = '', blockSuffix = '', element = '', modifier = '') {
  let cls = ''

  if (namespace) cls += namespace

  if (block) cls += `${cls ? '-' : ''}${block}`

  if (blockSuffix) cls += `-${blockSuffix}`

  if (element) cls += `__${element}`

  if (modifier) cls += `--${modifier}`

  return cls
}

/**
 * 创建 `BEM` 格式的 `CSS` 类名辅助工具
 */
export default function createBEM(block: string, namespaceOverrides?: MaybeGetter<string>) {
  const opts = assign({}, createBEM.defaults, { namespace: namespaceOverrides })
  const namespace = toValue(opts.namespace)
  const statePrefix = opts.statePrefix

  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element = '') => (element ? _bem(namespace, block, '', element, '') : '')
  const m = (modifier = '') => (modifier ? _bem(namespace, block, '', '', modifier) : '')
  const be = (blockSuffix = '', element = '') =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const em = (element = '', modifier = '') =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix = '', modifier = '') =>
    blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix = '', element = '', modifier = '') =>
    blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''
  const is = (name = '', state = true) => {
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  }
}
