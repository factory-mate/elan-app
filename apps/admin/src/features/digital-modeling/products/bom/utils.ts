import { SupplyType } from './enums'

export const supplyTypeLabelMap = new Map<string, string>([
  [SupplyType.USE, '领用'],
  [SupplyType.INBOUND, '入库倒冲'],
  [SupplyType.PROCESS, '工序倒冲']
])

export const supplyTypeValueMap = new Map<string, string>(
  Array.from(supplyTypeLabelMap).map(([value, label]) => [label, value])
)

export const supplyTypeOptions = Array.from(supplyTypeLabelMap).map(([_value, label]) => label)
