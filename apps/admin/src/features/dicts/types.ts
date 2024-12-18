export interface DictVo {
  UID: string
  cDictonaryCode: string
  cDictonaryName: string
  cDictonaryTypeCode: string
}

export type DictTypes =
  | 'UnitClassType' // 计量单位组别
  | 'BOMType' // BOM类型
  | 'PeriodUnitType' // 保质期单位
