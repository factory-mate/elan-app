export interface BOMChangeVo {
  cParentCode: string
  cParentName: string
  cParentVersion: string
  cParentdEffectiveDate: string
  cParentdExpirationDate: string
  cParentiStatusName: string
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

export interface BOMChangeReplaceDto {
  cInvCode: string
  list_UID: string[]
}
