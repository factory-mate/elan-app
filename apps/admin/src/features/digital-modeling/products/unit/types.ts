import type { Dayjs } from 'dayjs'

export interface UnitVo {
  UID: string
  cUnitClassCode: string
  cUnitCode: string
  cUnitName: string
  cUnitShortName: string
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

export interface UnitAddDto {
  cUnitClassCode: string
  cUnitCode: string
  cUnitName: string
  cUnitShortName: string
  cPerson: string
  cPhone: string
  cEmail: string
  cAddress: string
  cExch_Name: string
  cTaxID: string
  cLegalPerson: string
  cRegisterMoney: string
  dRegisterDate: string | Dayjs
  cDepCode: string
  cManagerCode: string
  IsCreditLimit: boolean
  cCreditLimit: string
  IsCreditTerm: boolean
  cCreditTerm: string
  dDevelopmentDate: string | Dayjs
  dStopDate: string | Dayjs
  cMemo: string
}

export interface UnitEditDto extends UnitAddDto {
  UID: string
  utfs: string
}
