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
}

export interface EmployeeAddDto {
  cEmployeeCode: string
  cEmployeeName: string
  cSexTypeCode: string
  cProfessionalTypeCode: string
  cProfessionalTypeName: string
  cDepCode: string
  cDepName: string
  cMobile: string
  dBirthDay: string
  cMeil: string
  cWeChat: string
  cPhoneAreaNumber: string
  cPhoneNumber: string
  cPhoneExtensionNumber: string
  cAdress: string
}

export interface EmployeeEditDto extends EmployeeAddDto {
  UID: string
  utfs: string
}
