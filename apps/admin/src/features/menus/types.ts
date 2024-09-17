export interface MenuVo {
  cMenuName: string
  cMenuCode: string
  cModelCode: string
  Child: MenuVo[] | null
}
