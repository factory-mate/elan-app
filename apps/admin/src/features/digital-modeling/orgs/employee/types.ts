export interface EmployeeVo {
  UID: string
  cEmployeeCode: string
  cEmployeeName: string
  cSexTypeCode: string
  cProfessionalTypeCode: string
  cProfessionalTypeName: string
  cDepCode: string
  cDepName: string
  cPersonCode: string
  cPersonName: string
  cMobile: string
  dBirthDay: string
  cMeil: string
  cWeChat: string
  cPhoneAreaNumber: string
  cPhoneNumber: string
  cPhoneExtensionNumber: string
  cAdress: string
  iStatus: number
  cEmployeeStatuCode: string
  dEndLoginTime: string
  IsValid: boolean
  bFreeze: boolean
  utfs: string
}

export interface EmployeeAddDto extends EmployeeVo {}

export interface EmployeeEditDto extends EmployeeAddDto {}

export interface EmployeeUpdateDeptDto {
  KeyVal: string[]
  cDepCode: string
}

export interface EmployeeSetFreezeStatusDto {
  KeyVal: string[]
  bFreeze: boolean
}

export interface EmployeeSetDeptDto {
  KeyVal: string[]
  cDepCode: string
}

export interface EmployeeSetPositionDto {
  KeyVal: string[]
  cProfessionalTypeCode: string
}

export interface EmployeeSetRoleDto {
  cLoginName: string[]
  cRoleCode: string[]
}
