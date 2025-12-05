export interface PermVo {
  UID?: string
  key?: string
  title?: string
  cMenuName?: string
  cMenuCode?: string
  cRoleCode?: string
  cModelCode?: string
  cParentCode?: string
  cOperationCode?: string
  cMenuPath?: string
  cOperationPath?: string
}

export interface PermTreeItemVo extends PermVo {
  key: string
  title: string
  Child: PermTreeItemVo[]
}

export interface SetPermsDto {
  models: PermVo[]
}
