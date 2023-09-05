import { combineURLs, isAbsoluteURL } from '@rhao/lodash-x'

/**
 * 默认基准路径
 */
getFullURL.defaultBase = '/'

/**
 * 获取完整的 URL
 *
 * @example
 * ```ts
 * getFullURL.defaultBase = '/website/'
 *
 * getFullURL('/a.txt')
 * // => '/website/a.txt'
 *
 * getFullURL('http://www.xxx.cn/b.jpeg')
 * // => 'http://www.xxx.cn/b.jpeg'
 *
 * getFullURL('c.txt', 'http://www.xxx.cn/')
 * // => 'http://www.xxx.cn/c.txt'
 *
 * getFullURL('d.exe', '')
 * // => 'd.exe'
 * ```
 */
export default function getFullURL(url: string, baseURL = getFullURL.defaultBase) {
  return baseURL && !isAbsoluteURL(url) ? combineURLs(baseURL, url) : url
}
