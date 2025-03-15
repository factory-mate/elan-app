import { BOMType, VouchType } from './enums'

export const bomTypeLabelMap = new Map<string, string>([
  [BOMType.STANDARD, '标准'],
  [BOMType.REPLACE, '替代']
])

export const bomTypeOptions = Array.from(bomTypeLabelMap).map(([value, label]) => ({
  label,
  value
}))

export const vouchTypeLabelMap = new Map<string, string>([
  [VouchType.STANDARD, '标准'],
  [VouchType.NON_STANDARD, '非标准']
])

export const vouchTypeOptions = Array.from(vouchTypeLabelMap).map(([value, label]) => ({
  label,
  value
}))
