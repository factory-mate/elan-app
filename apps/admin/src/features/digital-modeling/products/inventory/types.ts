export interface InventoryVo {
  UID: string
  cInvCode: string
  cInvName: string
  cInvstd: string
  cInvClassName: string
  cUnitClassName: string
  cVendorName: string
  cSaleUnitCode: string
  cSaleUnitName: string
  cProductUnitCode: string
  cProductUnitName: string
  cEnglishName: string
  cBuyUnitCode: string
  cBuyUnitName: string
}

export interface InventoryDetailVo {
  UID: string
  info?: InventoryInfoDto & { utfs: string }
  qc?: InventoryQCDto
  control?: InventoryControlDto
  cost?: InventoryCostDto
  extend?: InventoryExtendDto
}

export interface InventoryAddDto {
  info?: InventoryInfoDto
  qc?: InventoryQCDto
  control?: InventoryControlDto
  cost?: InventoryCostDto
  extend?: InventoryExtendDto
}

export interface InventoryInfoDto {
  cInvClassCode: string
  cVendorCode: string
  cInvCode: string
  cInvName: string
  cInvstd: string
  cMemo: string
  cUnitClassCode: string
  cSaleUnitCode: string
  cBuyUnitCode: string
  cStoreUnitCode: string
  cProductUnitCode: string
  cEnglishName: string
}

export interface InventoryQCDto {
  cInvCode: string
  IsQC: boolean
  cQCType: string
  cQCRuleType: string
  cQCUnitCode: string
  iQCRate: number
  iQCQuantity: number
  cQCProject: string
}

export interface InventoryControlDto {
  cInvCode: string
  IsBatch: boolean
  IsPeriod: boolean
  cPeriodUnitType: string
  iPeriodValue: number
  IsBuy: boolean
  IsProduct: boolean
  IsSale: boolean
  IsMaterial: boolean
  IsTax: boolean
  IsDiscount: boolean
  IsPart: boolean
  IsOutsourcing: boolean
  IsModel: boolean
  IsATO: boolean
  IsPTO: boolean
  IsEquipment: boolean
  IsSelect: boolean
  cMemo: string
}

export interface InventoryCostDto {
  cInvCode: string
  iStandardCost: number
  iReferenceCost: number
  iNewestCost: number
  iReferencePrice: number
}

export interface InventoryExtendDto {
  // CAS
  cDefindParm02: string
  // EINECS
  cDefindParm03: string
  // FEMA
  cDefindParm04: string
  // 天然过敏源
  cDefindParm05: string
  // 天然IFRA成分
  cDefindParm06: string
  // 26过敏源
  cDefindParm07: string
  // 玩具过敏源
  cDefindParm08: string
  // 食品过敏源
  cDefindParm09: string
  // 禁用原料
  cDefindParm10: string
}

export interface InventoryEditDto extends InventoryAddDto {
  UID: string
  utfs: string
}
