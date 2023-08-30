import type { MaybeNullish } from '@rhao/types-base'
import getFileTypeByExtname from '../getFileTypeByExtname'

/**
 * 解析 Content-Disposition
 *
 * @example
 * ```ts
 * const contentDisposition = 'attachment; filename="example.pdf"; filename*=UTF-8\'\'example%20%E6%B5%8B%E8%AF%95.pdf';
 *
 * const { rawFilename, filename, extname } = parseContentDisposition(contentDisposition)
 *
 * console.log(rawFilename, filename, extname)
 * // rawFilename => example%20%E6%B5%8B%E8%AF%95.pdf
 * // filename => example 测试.pdf
 * // extname => .pdf
 * ```
 */
export default function parseContentDisposition(contentDisposition: string) {
  const pattern = /filename=['"]?([^'"]+)['"]?(?:;\s*filename\*=['"]?(?:[\w-]+'+)([^'"]+)['"]?)?/
  const match = contentDisposition.match(pattern)

  let rawFilename: MaybeNullish<string> = null
  let filename: MaybeNullish<string> = null
  let filetype: MaybeNullish<string> = null
  let extname: MaybeNullish<string> = null

  if (match) {
    rawFilename = match[2] || match[1] || ''
    filename = decodeURIComponent(rawFilename)
    extname = filename.slice(filename.lastIndexOf('.'))
    filetype = getFileTypeByExtname(extname)
  }

  return { rawFilename, filename, filetype, extname }
}
