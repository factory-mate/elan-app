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

export interface RoleBatchAddDto {
  Items: RoleBatchAddItemDto[]
}

export interface RoleBatchAddItemDto {
  cLoginName: string
  cRoleCode: string
}
