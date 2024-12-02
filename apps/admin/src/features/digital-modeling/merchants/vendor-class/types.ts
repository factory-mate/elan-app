export interface VendorClassVo {
  UID: string
  cVendorClassCode: string
  cVendorClassName: string
  iGrade: number
}

export interface VendorClassTreeItemVo extends VendorClassVo {
  title: string
  key: string
  Child: VendorClassTreeItemVo[]
}

export interface VendorClassAddDto {
  cParentCode: string
  cVendorClassCode: string
  cVendorClassName: string
  iGrade: number
}

export interface VendorClassEditDto extends VendorClassAddDto {
  UID: string
  utfs: string
}
