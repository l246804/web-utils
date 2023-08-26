/**
 * 判断是否为客户端，依据是包含 `window` 对象
 */
export default function isClient() {
  return typeof window !== 'undefined'
}
