export interface MainProductionPlanMpsVo {
  iStatusName: string
  iStatus: number
  cInvCode: string
  cInvName: string
  cInvStd: string
  cDepCode: string
  cDepName: string
  nQuantity: number
  nStockQuantity: number
  dStartDate: string
  dEndDate: string
  cUnitName: string
  UID: string
  IsValid: true
  IsDelete: true
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserName: string
  utfs: string
}

export interface MainProductionPlanMpsEditDto extends MainProductionPlanMpsVo {}

export interface MainProductionPlanMpsComputeDto {
  dStartDate: string
  dEndDate: string
}
