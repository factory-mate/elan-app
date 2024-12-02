export interface SupplierClassVo {
  UID: string
  cSupplierClassCode: string
  cSupplierClassName: string
  iGrade: number
}

export interface SupplierClassTreeItemVo extends SupplierClassVo {
  title: string
  key: string
  Child: SupplierClassTreeItemVo[]
}

export interface SupplierClassAddDto {
  cParentCode: string
  cSupplierClassCode: string
  cSupplierClassName: string
  iGrade: number
}

export interface SupplierClassEditDto extends SupplierClassAddDto {
  UID: string
  utfs: string
}
