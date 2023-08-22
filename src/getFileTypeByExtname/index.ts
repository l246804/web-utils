/**
 * 根据扩展名获取常用文件类型
 *
 * @example
 * ```ts
 * console.log(getFileTypeByExtname(''))
 * // => null
 *
 * console.log(getFileTypeByExtname('png'))
 * // => 'image/png'
 *
 * console.log(getFileTypeByExtname('.html'))
 * // => 'text/html'
 * ```
 */
export default function getFileTypeByExtname(extname: string): string | null {
  const extnameToContentTypeMap = {
    // Microsoft Word
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

    // Microsoft Excel
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    // Microsoft PowerPoint
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // GZ 压缩文件格式
    '.gz': 'application/x-gzip',
    '.gzip': 'application/x-gzip',

    // ZIP 压缩文件格式
    '.zip': 'application/zip',
    '.7zip': 'application/zip',

    // RAR 压缩文件格式
    '.rar': 'application/rar',

    // TAR 压缩文件格式
    '.tar': 'application/x-tar',
    '.taz': 'application/x-tar',

    // PDF 是 Portable Document Format 的简称，即便携式文档格式
    '.pdf': 'application/pdf',

    // RTF 是指 Rich Text Format，即通常所说的富文本格式
    '.rtf': 'application/rtf',

    // 图像格式
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.jpg2': 'image/jpeg',
    '.png': 'image/png',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml',
    '.svgz': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',

    // 金山 Office 文件格式
    '.wps': 'application/kswps',
    '.et': 'application/kset',
    '.dps': 'application/ksdps',

    // Photoshop 源文件格式
    '.psd': 'application/x-photoshop',

    // Coreldraw 源文件格式
    '.cdr': 'application/x-coreldraw',

    // Adobe Flash 源文件格式
    '.swf': 'application/x-shockwave-flash',

    // 普通文本格式
    '.txt': 'text/plain',

    // Javascript 脚本文件
    '.js': 'text/javascript',
    '.cjs': 'text/javascript',
    '.mjs': 'text/javascript',

    // CSS 样式表
    '.css': 'text/css',

    // HTML 文件格式
    '.html': 'text/html',
    '.shtml': 'text/html',
    '.htm': 'text/html',

    // XML 文件格式
    '.xml': 'text/xml',

    // XHTML 文件格式
    '.xhtml': 'application/xhtml+xml',
    '.xht': 'application/xhtml+xml',

    // VCF 文件格式
    '.vcf': 'text/x-vcard',

    // PHP 文件格式
    '.php': 'application/x-httpd-php',
    '.php3': 'application/x-httpd-php',
    '.php4': 'application/x-httpd-php',
    '.phtml': 'application/x-httpd-php',

    // Java 归档文件格式
    '.jar': 'application/java-archive',

    // Android 平台包文件格式
    '.apk': 'application/vnd.android.package-archive',

    // Windows 系统可执行文件格式
    '.exe': 'application/octet-stream',

    // PEM 文件格式
    '.crt': 'application/x-x509-user-cert',
    '.pem': 'application/x-x509-user-cert',

    // 音频格式
    '.mp3': 'audio/mpeg',
    '.mid': 'audio/midi',
    '.midi': 'audio/midi',
    '.wav': 'audio/x-wav',
    '.m3u': 'audio/x-mpegurl',
    '.m4a': 'audio/x-m4a',
    '.ogg': 'audio/ogg',
    '.ra': 'audio/x-realaudio',

    // 视频格式
    '.mp4': 'video/mp4',
    '.mpg': 'video/mpeg',
    '.mpe': 'video/mpeg',
    '.mpege': 'video/mpeg',
    '.qt': 'video/quicktime',
    '.mov': 'video/quicktime',
    '.m4v': 'video/x-m4v',
    '.wmv': 'video/x-ms-wmv',
    '.avi': 'video/x-msvideo',
    '.webm': 'video/webm',
    '.flv': 'video/x-flv',

    // CSV 文件格式
    '.csv': 'text/csv',

    // JSON 文件格式
    '.json': 'application/json',
    '.jsonc': 'application/json',
    '.json5': 'application/json',

    // 字体
    '.ttf': 'font/ttf',
    '.ttf2': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',

    // OpenDocument 文件
    '.odp': 'application/vnd.oasis.opendocument.presentation',
    '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
    '.odt': 'application/vnd.oasis.opendocument.text',
  }

  return extnameToContentTypeMap[`.${extname.toLowerCase().replace(/^\./g, '')}`] || null
}
