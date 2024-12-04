export interface VendorVo {
  UID: string
  cVendorClassCode: string
  cVendorCode: string
  cVendorName: string
  cVendorShortName: string
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
  cManagerCode: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string
  dStopDate: string
  cMemo: string
}

export interface VendorAddDto {
  cParentCode: string
  cVendorClassCode: string
  cVendorCode: string
  cVendorName: string
  cVendorShortName: string
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
  cManagerCode: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string
  dStopDate: string
  cMemo: string
}

export interface VendorEditDto extends VendorAddDto {
  UID: string
  utfs: string
}
