export interface InventoryClassVo {
  UID: string
  cInvClassCode: string
  cInvClassName: string
  iGrate: number
}

export interface InventoryClassTreeItemVo extends InventoryClassVo {
  title: string
  key: string
  Child: InventoryClassTreeItemVo[]
}

export interface InventoryClassAddDto {
  cParentCode: string
  cInvClassCode: string
  cInvClassName: string
  iGrate: number
}

export interface InventoryClassEditDto extends InventoryClassAddDto {
  UID: string
  utfs: string
}
