export interface CustomerVo {
  UID: string
  cCustomerClassCode: string
  cCustomerCode: string
  cCustomerName: string
  cCustomerShortName: string
  cPerson: string
  cPhone: string
  cEmail: string
  cAddress: string
  cExch_Name: string
  cTaxID: string
  cLegalPerson: string
  cRegisterMoney: string
  dRegisterDate: string
  cDepCode: string
  cDepName: string
  cManagerCode: string
  cEmployeeName: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string
  dStopDate: string
  cMemo: string
}

export interface CustomerAddDto {
  cCustomerClassCode: string
  cCustomerCode: string
  cCustomerName: string
  cCustomerShortName: string
  cPerson: string
  cPhone: string
  cEmail: string
  cAddress: string
  cExch_Name: string
  cTaxID: string
  cLegalPerson: string
  cRegisterMoney: string
  dRegisterDate: string
  cDepCode: string
  cDepName: string
  cManagerCode: string
  cEmployeeName: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string
  dStopDate: string
  cMemo: string
}

export interface CustomerEditDto extends CustomerAddDto {
  UID: string
  utfs: string
}
