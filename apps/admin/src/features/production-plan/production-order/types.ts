export interface ProductionOrderVo {
  RestQuantity: number
  cCode: string
  dDate: string
  cVouchType: string
  cStandardType: string
  cVerifyer: string
  dVerifyTime: string
  cCloser: string
  dCloseTime: string
  HeadiStatus: number
  cVouchTypeName: string
  cStandardTypeName: string
  HeadiStatusName: string
  MID: string
  cSourceCode: string
  cSourceRowUID: string
  cInvCode: string
  cInvName: string
  nQuantity: number
  cMemo: string
  cDefindParm01: string
  cDefindParm02: string
  cDefindParm03: string
  cDefindParm04: string
  cDefindParm05: string
  cDefindParm06: string
  cDefindParm07: string
  cDefindParm08: string
  cDefindParm09: string
  cDefindParm10: string
  cInvStd: string
  cAssQuantity: number
  cAssUnitName: string
  bCheck: true
  cUnitName: string
  bHalf: true
  cUnitCode: string
  dEndTime: string
  cBomType: string
  cBomVersion: string
  dBeginTime: string
  cBomUID: string
  UID: string
  IsValid: true
  IsDelete: true
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  cSourceAppType: string
  iStatus: number
  utfs: string
}

export interface ProductionOrderAddDto {}

export interface ProductionOrderEditDto {}

export enum TaskStatus {
  AUDIT = 0,
  ABANDON = 1,
  OPEN = 2,
  CLOSE = 3
}
