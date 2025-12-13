export interface CraftRouteVo {
  UID: string
  cCraftRouteCode: string
  cCraftRouteName: string
  cCraftRouteGroupCode: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
  Items: CraftRouteProcessVo[]
  Resources: CraftRouteResourceVo[]
}

export interface CraftRouteProcessVo {
  cProcessName?: string
  list_step?: CraftRouteStepVo[]
  cCraftRouteCode?: string
  cProcessCode?: string
  iIndx?: number
  cMemo?: string
  dWaitTime?: number
  dReadyTime?: number
  bMain?: boolean
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
}

export interface CraftRouteStepVo {
  cStepName?: string
  cProcessCode?: string
  MID?: string
  cStepCode?: string
  iIndx?: number
  cMemo?: string
  PID?: string
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
}

export interface CraftRouteResourceVo {
  cCraftRouteCode?: string
  cResourceTypeCode?: string
  cResourceCode?: string
  cResourceName?: string
  cInvStd?: string
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
}

export interface CraftRouteAddDto extends CraftRouteVo {}

export interface CraftRouteEditDto extends CraftRouteAddDto {
  list_S: CraftRouteProcessDto[]
  list_Resource: CraftRouteResourceDto[]
}

export interface CraftRouteProcessDto {
  cProcessCode?: string
  cProcessName?: string
  iIndx?: number
  cMemo?: string
  dWaitTime?: number
  dReadyTime?: number
  bMain?: boolean
  list_SS?: CraftRouteStepDto[]
}

export interface CraftRouteStepDto {
  cStepCode?: string
  cStepName?: string
  iIndx?: number
}

interface CraftRouteResourceDto {
  cResourceCode?: string
  cResourceName?: string
  cInvStd?: string
}
