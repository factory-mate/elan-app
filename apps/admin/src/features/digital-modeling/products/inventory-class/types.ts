export interface InventoryClassVo {
  UID: string
  cInventoryClassCode: string
  cInventoryClassName: string
  iGrade: number
}

export interface InventoryClassTreeItemVo extends InventoryClassVo {
  title: string
  key: string
  Child: InventoryClassTreeItemVo[]
}

export interface InventoryClassAddDto {
  cParentCode: string
  cInventoryClassCode: string
  cInventoryClassName: string
  iGrade: number
}

export interface InventoryClassEditDto extends InventoryClassAddDto {
  UID: string
  utfs: string
}
