import { assign, isString } from 'lodash-unified'
import type {
  CreateDictionaryOptions,
  DictionaryMethods,
  DictionaryObject,
} from '../createDictionary'
import createDictionary from '../createDictionary'

type _DictionaryObject<T> = DictionaryObject<{ data: T }>

export interface ArrayToDictionaryOptions<T> extends CreateDictionaryOptions {
  /**
   * 字典项的值键，最好为唯一值字段
   * @default 'value'
   */
  valueKey?: string
  /**
   * 字典项的标签键
   * @default 'label'
   */
  labelKey?: string
  /**
   * 字典自定义方法
   */
  methods?: DictionaryMethods<_DictionaryObject<T>>
}

/**
 * 默认配置
 */
arrayToDictionary.defaults = {
  valueKey: 'value',
  labelKey: 'label',
} as ArrayToDictionaryOptions<unknown>

/**
 * 将数组转换为字典
 */
export default function arrayToDictionary<
  T,
  Options extends ArrayToDictionaryOptions<any> = ArrayToDictionaryOptions<T>,
  Methods = Options['methods'],
>(arr: T[], options?: Options) {
  const { valueKey, labelKey, methods, ...createDictionaryOptions } = assign(
    {},
    arrayToDictionary.defaults,
    options,
  )
  if (!valueKey) console.warn('[ArrayToDictionary]: valueKey is required.')

  const rawDict: _DictionaryObject<T> = {}
  for (const item of arr) {
    const obj = assign(
      {},
      isString(item)
        ? { value: item, label: item }
        : { value: item[valueKey!], label: item[labelKey!] },
      { data: item },
    )
    if (obj.value != null) rawDict[obj.value] = obj
  }

  return createDictionary(
    rawDict,
    methods as Methods extends DictionaryMethods ? Methods : DictionaryMethods<typeof rawDict>,
    createDictionaryOptions,
  )
}
