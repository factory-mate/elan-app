export interface DepartmentVo {
  UID: string
  cDepCode: string
  cDepName: string
  bProduct: boolean
  iStatus: number
  cCreateUserName: string
  dModifyTime: string
}

export interface DepartmentTreeItemVo extends DepartmentVo {
  title: string
  key: string
  Child: DepartmentTreeItemVo[]
}

export interface DepartmentAddDto {
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

export interface DepartmentEditDto extends DepartmentAddDto {
  UID: string
  utfs: string
}
