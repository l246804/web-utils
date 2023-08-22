import type { Nullish, PromiseFn } from '@rhao/types-base'
import type { FileSaverOptions } from 'file-saver'
import { saveAs as baseSaveAs } from 'file-saver'
import { assign, isFunction, isObject } from 'lodash-unified'

export interface SaveAsOptions extends FileSaverOptions {
  /**
   * 下载文件名称
   */
  filename?: string
  /**
   * 通过 `url` 查询获取文件流，支持动态修改 `options`，最终需返回 `Blob` 数据，若需中断，则返回 `null` 或 `undefined`
   *
   * @example
   * ```ts
   * import { parseContentDisposition } from '@rhao/web-utils'
   *
   * saveAs('/api/example', {
   *   fetcher: async (url, options) => {
   *     const res = await fetch(url, { method: 'GET' })
   *     const filename = parseContentDisposition(res.headers.get('Content-Disposition')).filename
   *     if (filename) options.filename = filename
   *     return res.blob()
   *   }
   * })
   * ```
   */
  fetcher?: PromiseFn<[url: string, options: SaveAsOptions], Blob | Nullish>
}

/**
 * 默认配置
 */
saveAs.defaults = { autoBom: false } as SaveAsOptions

/**
 * FileSaver 二次封装，支持通过 `fetcher` 获取文件流
 *
 * @example
 * ```ts
 * // 默认配置 fetcher
 * saveAs.defaults.fetcher = (url, options) => {
 *   const res = fetch(url, { method: 'GET' })
 *   const filename = parseContentDisposition(res.headers.get('Content-Disposition')).filename
 *   // 如果附件存在文件名，则设置下载文件名为附件名称
 *   if (filename) options.filename = filename
 *   // 返回 Blob 数据
 *   return res.blob()
 * }
 *
 * // 调用接口下载文件
 * saveAs('/api/example')
 *
 * // 使用原 FileSaver.saveAs
 * saveAs('http://example.com/example.img', '测试.img', { fetcher: null })
 * ```
 */
async function saveAs(
  data: string | Blob,
  filenameOrOptions?: string | SaveAsOptions,
  options?: SaveAsOptions,
) {
  const opts: SaveAsOptions = assign(
    {},
    saveAs.defaults,
    isObject(filenameOrOptions) ? filenameOrOptions : { filename: filenameOrOptions },
    options,
  )
  if (!isFunction(opts.fetcher) || typeof data !== 'string')
    return baseSaveAs(data, opts.filename, opts)

  const blob = await opts.fetcher(data, opts)
  if (!(blob instanceof Blob)) return
  baseSaveAs(blob, opts.filename, opts)
}

export default saveAs
