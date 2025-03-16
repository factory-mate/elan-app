export interface RoleVo {
  UID: string
  cRoleCode: string
  cRoleName: string
  IsValid: boolean
  cMemo: string
  utfs: string
}

export interface RoleAddDto extends RoleVo {}

export interface RoleEditDto extends RoleAddDto {}
