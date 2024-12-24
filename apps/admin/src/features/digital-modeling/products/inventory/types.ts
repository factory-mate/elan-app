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
}

export interface InventoryDetailVo {
  UID: string
  info?: InventoryInfoDto & { utfs: string }
  qc?: InventoryQCDto
  control?: InventoryControlDto
  cost?: InventoryCostDto
  extend?: any
}

export interface InventoryAddDto {
  info?: InventoryInfoDto
  qc?: InventoryQCDto
  control?: InventoryControlDto
  cost?: InventoryCostDto
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

export interface InventoryEditDto extends InventoryAddDto {
  UID: string
  utfs: string
  extend?: any
}
