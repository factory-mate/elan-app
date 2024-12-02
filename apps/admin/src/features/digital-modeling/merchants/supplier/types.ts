export interface SupplierVo {
  UID: string
  cSupplierClassCode: string
  cSupplierCode: string
  cSupplierName: string
  cSupplierShortName: string
  cPerson: string
  cPhone: string
  cEmail: string
  cAddress: string
}

export interface SupplierTreeItemVo extends SupplierVo {
  title: string
  key: string
  Child: SupplierTreeItemVo[]
}

export interface SupplierAddDto {
  cParentCode: string
  cSupplierClassCode: string
  cSupplierCode: string
  cSupplierName: string
  cSupplierShortName: string
  cPerson: string
  cPhone: string
  cEmail: string
  cAddress: string
  cExch_Name: string
  cTaxID: string
  cLegalPerson: string
  cRegisterMoney: string
  dRegisterDate: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string
  dStopDate: string
  cMemo: string
}

export interface SupplierEditDto extends SupplierAddDto {
  UID: string
  utfs: string
}
