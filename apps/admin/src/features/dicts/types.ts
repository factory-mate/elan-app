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
  | 'ProductVouchStandardType' // 生产订单类型
  | 'ProductVouchType' // 生产订单类别
  | 'cProfessionalTypeCode' // 职务

export interface DictTypeDto {
  cTableCode: DictTableCodes
  cAttributeCode: DictAttributeCodes
}

export type DictTableCodes = 'FM_MES_STEP' // 工步表

export type DictAttributeCodes = 'cStepType' // 工步属性
