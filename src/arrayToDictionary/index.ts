import type { Recordable } from '@rhao/types-base'
import { assign, isString } from 'lodash-unified'
import type { CreateDictionaryOptions, DictionaryItem, DictionaryMethods } from '../createDictionary'
import createDictionary from '../createDictionary'

export interface ArrayToDictionaryOptions extends CreateDictionaryOptions {
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
   * 字典项的数据键，若不设置则不存储原始数据项
   * @default 'data'
   */
  dataKey?: string
  /**
   * 字典自定义方法
   */
  methods?: DictionaryMethods
}

/**
 * 默认配置
 */
arrayToDictionary.defaults = {
  valueKey: 'value',
  labelKey: 'label',
  dataKey: 'data',
} as ArrayToDictionaryOptions

/**
 * 将数组转换为字典
 */
export default function arrayToDictionary<const T extends object>(
  arr: (T | string | number)[],
  options?: ArrayToDictionaryOptions,
) {
  const { valueKey, labelKey, dataKey, methods, ...createDictionaryOptions } = assign(
    {},
    arrayToDictionary.defaults,
    options,
  )
  if (!valueKey) console.warn('[ArrayToDictionary]: valueKey is required.')

  const rawDict: Recordable<DictionaryItem> = {}
  for (const item of arr) {
    const obj = assign(
      {},
      isString(item)
        ? { value: item, label: item }
        : { value: item[valueKey!], label: item[labelKey!] },
    )
    if (dataKey) assign(obj, { [dataKey]: item })
    if (obj.value != null) rawDict[obj.value] = obj
  }

  return createDictionary(rawDict, methods, createDictionaryOptions)
}