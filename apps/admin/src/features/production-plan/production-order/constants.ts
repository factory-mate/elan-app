import { BOMType } from './enums'

export const bomTypeLabelMap = new Map<string, string>([
  [BOMType.STANDARD, '标准'],
  [BOMType.REPLACE, '替代']
])

export const bomTypeValueMap = new Map<string, string>(
  Array.from(bomTypeLabelMap).map(([value, label]) => [label, value])
)

export const bomTypeOptions = Array.from(bomTypeLabelMap).map(([_value, label]) => label)
