import type { Dayjs } from 'dayjs'

export interface RecipeRoleRefVo {
  cRoleCode: string
  cRoleName: string
  iBOMStatus: number
  iBOMStatusName: string
  cBOMType: string | null
  cBOMTypeName: string | null
  cInvCode: string
  cInvName: string
  cInvstd: string | null
  cVersion: string
  dVersionDate: string | Dayjs
  cVerisionMemo: string | null
  BomUID: string
  UID: string
  IsValid: boolean
  IsDelete: boolean
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string | null
  cModifyUserName: string | null
  dModifyTime: string | null
  cSourceAppType: string
  iStatus: number
  utfs: string
}

export interface RecipeRoleRefAddDto extends RecipeRoleRefVo {}

export interface RecipeRoleRefEditDto extends RecipeRoleRefAddDto {}
