import getRootFontSize from '../getRootFontSize'
import getWindowSize from '../getWindowSize'
import type { Numeric } from '../isNumeric'

function convertRem(value: string) {
  value = value.replace(/rem/g, '')
  return +value * getRootFontSize()
}
function convertVw(value: string) {
  value = value.replace(/vw/g, '')
  return (+value * getWindowSize().width) / 100
}
function convertVh(value: string) {
  value = value.replace(/vh/g, '')
  return (+value * getWindowSize().height) / 100
}
export default function unitToPx(value: Numeric) {
  if (typeof value === 'number') return value

  if (typeof window !== 'undefined') {
    if (value.includes('rem')) return convertRem(value)
    if (value.includes('vw')) return convertVw(value)
    if (value.includes('vh')) return convertVh(value)
  }

  return Number.parseFloat(value)
}
