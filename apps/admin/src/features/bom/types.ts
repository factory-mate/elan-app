export interface BOMVo {
  iStatusName: string
  cBOMTypeName: string
  cBOMType: string
  cInvCode: string
  cInvName: string
  cInvstd: string
  cUnitCode: string
  cUnitName: string
  cVersion: string
  dVersionDate: string
  cVerisionMemo: string
  dEffectiveDate?: string
  cReplaceStatus: string
  cReplaceMemo: string
  iStatus: number
  cSourceStatus: string
  UID: string
  IsValid: boolean
  IsDelete: boolean
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  cSourceAppType: string
  utfs: string
  Id: string
  IsProduct: boolean
  cEnglishName: string
  nQuantity: number
}

export interface BOMTreeItemVo extends BOMVo {
  title: string
  key: string
  Child: BOMTreeItemVo[]
}

export interface BOMChildItemVo {
  cDepName?: string
  cWareHouseName?: string | null
  cParentCode?: string
  cParentName?: string
  cSupplyTypeName?: string
  MID?: string
  iRowNumber?: string
  iProcessNumber?: string
  cInvCode?: string
  cInvName?: string
  cInvstd?: string
  cUnitCode?: string
  cUnitName?: string
  iBasicQty?: number
  iBaseQty?: number
  iLossRate?: number
  iUseQty?: number
  iFixedQty?: number
  cSupplyType?: string
  cWareHouseCode?: string | null
  cDepCode?: string
  cMaterialType?: string
  dEffectiveDate?: string
  dExpirationDate?: string
  UID?: string
  IsValid?: boolean
  IsDelete?: boolean
  cCreateUserCode?: string
  cCreateUserName?: string
  dCreateTime?: string
  cModifyUserCode?: string
  cModifyUserName?: string
  dModifyTime?: string
  cSourceAppType?: string
  iStatus?: number
  utfs?: string
  cEnglishName?: string
}

export interface BOMAddDto extends BOMVo {
  Bodys: BOMChildItemVo[]
}

export interface BOMEditDto extends BOMVo {
  Bodys: BOMChildItemVo[]
}
