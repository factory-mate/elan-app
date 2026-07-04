export interface MenuVo {
  UID: string
  cMenuCode: string
  cMenuName: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
}

export interface MenuAddDto extends MenuVo {}

export interface MenuEditDto extends MenuAddDto {}
