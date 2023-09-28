import type { Recordable } from '@rhao/types-base'
import { assign, isFunction, mapValues, toPairs } from 'lodash-unified'

/**
 * 字典项
 */
export interface DictionaryItem extends Recordable {
  /**
   * 未设置时为字典键
   */
  value?: string | number
  /**
   * 未设置时为空字符串，若设置 `options.allowEmptyLabel` 为 `false` 时则会使用字典键填充空值
   */
  label?: string
}

/**
 * 规范化字典项
 */
export type NormalizeDictionaryItem<T extends DictionaryItem = DictionaryItem> = T & {
  /**
   * 字典键
   */
  readonly key: string
  value: NonNullable<T['value']> extends object ? string : NonNullable<T['value']>
  label: NonNullable<T['label']> extends object ? string : NonNullable<T['label']>
}

/**
 * 字典对象
 */
export type DictionaryObject = Recordable<DictionaryItem, string>

/**
 * 规范化字典对象
 */
export type NormalizeDictionaryObject<T extends DictionaryObject = DictionaryObject> = {
  [K in keyof T]: NormalizeDictionaryItem<T[K]>
}

/**
 * 字典函数类型
 */
export type DictionaryFn<T extends DictionaryObject> = (
  this: Dictionary<T, Recordable>,
  ...args: any[]
) => any

/**
 * 字典方法
 */
export type DictionaryMethods<T extends DictionaryObject = DictionaryObject> = Recordable<
  DictionaryFn<T>
>

/**
 * 字典内置方法
 */
export interface DictionaryBuiltinMethods<
  T extends DictionaryObject,
  M extends DictionaryMethods<T> = DictionaryMethods<T>,
> {
  /**
   * 克隆字典，将基于原始参数和新参数创建新字典
   *
   * @example
   * ```ts
   * const dictionary = createDictionary({
   *   test: {}
   * })
   * dictionary.entries()
   * // => [ [ 'test', { key: 'test', value: 'test', label: '' } ] ]
   *
   * const clonedDictionary = dictionary.clone({ test2: {} }, { isTest2() { return true } })
   * clonedDictionary.entries()
   * // => [ [ 'test', { key: 'test', value: 'test', label: '' } ], [ 'test2', { key: 'test2', value: 'test2', label: '' } ] ]
   *
   * clonedDictionary.isTest2()
   * // => true
   * ```
   */
  clone<
    const T2 extends DictionaryObject,
    M2 extends DictionaryMethods<T2 & Omit<T, keyof T2>> = DictionaryMethods<
      T2 & Omit<T, keyof T2>
    >,
  >(
    dict?: T2,
    methods?: M2,
    options?: CreateDictionaryOptions,
  ): Dictionary<T2 & Omit<T, keyof T2>, M2>

  /**
   * 获取字典键值集合
   *
   * @example
   * ```ts
   * const dictionary = createDictionary({
   *   test: {}
   * })
   * dictionary.entries()
   * // => [ [ 'test', { key: 'test', value: 'test', label: '' } ] ]
   * ```
   */
  entries(this: Dictionary<T, M>): [key: string, value: BasicDictionary<T>[keyof T] & Recordable][]

  /**
   * 获取字典键集合
   *
   * @example
   * ```ts
   * const dictionary = createDictionary({
   *   test: {}
   * })
   * dictionary.keys()
   * // => [ 'test' ]
   * ```
   */
  keys(this: Dictionary<T, M>): (keyof T)[]

  /**
   * 获取字典项集合
   *
   * @example
   * ```ts
   * const dictionary = createDictionary({
   *   test: {}
   * })
   * dictionary.values()
   * // => [ { key: 'test', value: 'test', label: '' } ]
   * ```
   */
  values(this: Dictionary<T, M>): (BasicDictionary<T>[keyof T] & Recordable)[]

  /**
   * 根据值获取字典项
   *
   * @example
   * ```ts
   * const dictionary = createDictionary({
   *   test: {},
   *   test2: {
   *     value: 1,
   *   }
   * })
   *
   * dictionary.findByValue('test')
   * // => { key: 'test', value: 'test', label: '' }
   *
   * dictionary.findByValue(1)
   * // => { key: 'test2', value: 1, label: '' }
   * ```
   */
  findByValue(
    this: Dictionary<T, M>,
    value: NonNullable<DictionaryItem['value']>,
  ): (BasicDictionary<T>[keyof T] & Recordable) | undefined

  /**
   * 覆盖字典方法，仅支持覆盖内置方法和创建时传入的方法
   *
   * @example
   * ```ts
   * const dict = createDictionary({
   *   test1: {},
   *   test2: {},
   * })
   *
   * dict.override('entries', function () {
   *   return Object.entries(this).sort(([a], [b]) => a.localeCompare(b))
   * })
   * ```
   */
  override<K extends keyof Methods<T, M>>(
    this: Dictionary<T, M>,
    key: K,
    fn: (
      this: Dictionary<T, M>,
      ...args: Parameters<Methods<T, M>[K]>
    ) => ReturnType<Methods<T, M>[K]>,
  ): void

  /**
   * 清除覆盖的字典方法
   */
  clearOverride(this: Dictionary<T, M>, key: keyof Methods<T, M>): void
}

/**
 * 方法集合
 */
type Methods<
  T extends DictionaryObject,
  M extends DictionaryMethods<T> = DictionaryMethods<T>,
> = DictionaryBuiltinMethods<T, M> & M

/**
 * 基础字典实例
 */
export type BasicDictionary<T extends DictionaryObject> = NormalizeDictionaryObject<T>

/**
 * 字典实例
 */
export type Dictionary<
  T extends DictionaryObject,
  M extends DictionaryMethods<T> = DictionaryMethods<T>,
> = BasicDictionary<T> & Methods<T, M>

/**
 * 内置方法
 */
const builtinMethods: Omit<
  DictionaryBuiltinMethods<DictionaryObject>,
  'override' | 'clearOverride' | 'clone'
> = {
  entries() {
    return Object.entries(this)
  },
  keys() {
    return this.entries().map(([key]) => key)
  },
  values() {
    return this.entries().map(([, value]) => value)
  },
  findByValue(value) {
    return this.values().find((info) => info.value === value)
  },
}

export interface CreateDictionaryOptions {
  /**
   * 是否允许字典项标签为空，若为 `false` 时，则会使用字典键填充空值
   * @default true
   *
   * @example
   * ```ts
   * const dict = createDictionary({ test: {} })
   * dict.test
   * // => { key: 'test', value: 'test', label: '' }
   *
   * const dict = createDictionary({ test: {} }, {}, { allowEmptyLabel: false })
   * dict.test
   * // => { key: 'test', value: 'test', label: 'test' }
   * ```
   */
  allowEmptyLabel?: boolean
}

/**
 * 默认配置
 */
createDictionary.defaults = {
  allowEmptyLabel: true,
} as CreateDictionaryOptions

/**
 * 创建字典
 *
 * @example
 * ```ts
 * const dict = createDictionary(
 *   {
 *      disabled: {
 *        value: 0,
 *        valueOf: () => false,
 *        label: '禁用',
 *      },
 *      enabled: {
 *        value: 1,
 *        valueOf: () => true,
 *        label: '启用',
 *      },
 *   },
 *   // 自定义方法，不会被枚举到
 *   {
 *      getOpposite(v: boolean | number) {
 *        return this.findByValue(Math.abs(+v - 1))
 *      }
 *   }
 * )
 *
 * dict.disabled.value
 * // => 0
 * dict.disabled.valueOf()
 * // => false
 *
 * dict.getOpposite(dict.disabled.value)
 * // => { key: 'enabled', value: 1, label: '启用', valueOf: () => true }
 * ```
 */
export default function createDictionary<
  const T extends DictionaryObject,
  M extends DictionaryMethods<T> = DictionaryMethods<T>,
>(dict: T, methods?: M, options?: CreateDictionaryOptions) {
  const opts = assign({}, createDictionary.defaults, options)

  const dictionary = {} as Dictionary<T, M>
  const overrideMethods: DictionaryMethods<T> = {}
  const mergedMethods: DictionaryMethods<T> = assign({}, methods, builtinMethods)

  mergedMethods.override = function (key, fn) {
    if (isFunction(fn)) overrideMethods[key] = fn
  }

  mergedMethods.clearOverride = function (key) {
    delete overrideMethods[key]
  }

  mergedMethods.clone = function (d2, m2, o2) {
    return createDictionary(assign({}, dict, d2), assign({}, methods, m2), assign({}, options, o2))
  }

  Object.defineProperties(
    dictionary,
    mapValues(mergedMethods, (value, key) => {
      const fn = overrideMethods[key] || value
      return {
        value: (...args) => fn.apply(dictionary, args),
      }
    }),
  )

  toPairs(dict).forEach(([key, info]) => {
    const item = assign({}, info) as NormalizeDictionaryItem<DictionaryItem>
    Object.defineProperty(item, 'key', { enumerable: true, value: key })

    if (item.value == null) item.value = key

    if (item.label == null || item.label === '') item.label = opts.allowEmptyLabel ? '' : key
    else item.label = String(item.label)

    // @ts-expect-error
    dictionary[key] = item
  })

  return dictionary
}
