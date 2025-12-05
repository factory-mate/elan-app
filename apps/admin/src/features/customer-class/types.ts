export interface CustomerClassVo {
  UID: string
  cCustomerClassCode: string
  cCustomerClassName: string
  iGrade: number
}

export interface CustomerClassTreeItemVo extends CustomerClassVo {
  title: string
  key: string
  Child: CustomerClassTreeItemVo[]
}

export interface CustomerClassAddDto {
  cParentCode: string
  cCustomerClassCode: string
  cCustomerClassName: string
  iGrade: number
}

export interface CustomerClassEditDto extends CustomerClassAddDto {
  UID: string
  utfs: string
}
