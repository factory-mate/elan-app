export interface CustomerVo {
  UID: string
  cDepCode: string
  cDepName: string
  bProduct: boolean
  iStatus: number
  cCreateUserName: string
  dModifyTime: string
}

export interface CustomerTreeItemVo extends CustomerVo {
  title: string
  key: string
  Child: CustomerTreeItemVo[]
}

export interface CustomerAddDto {
  cParentCode: string
  cDepCode: string
  cDepName: string
  cMemo: string
  bProduct: boolean
  bodys: EmployeeBody[]
}

interface EmployeeBody {
  cEmployeeCode: string
  cEmployeeName: string
}

export interface CustomerEditDto extends CustomerAddDto {
  UID: string
  utfs: string
}
