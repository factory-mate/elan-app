export interface CodingSchemeVo {
  cProgramTypeName: string
  cProgramType: string
  iMaxGrade: number
  iMaxLength: number
  iOneMaxLength: number
  iFirstLength: number
  iSecondLength: number
  iThirdLength: number
  iFouthLength: number
  iFifthLength: number
  iSixthLength: number
  iSeventhLength: number
  iEighthLength: number
  iNinthLength: number
  iTenthLength: number
  iEleventhLength: number
  iTwelfthLength: number
  UID: string
  IsValid: boolean
  IsDelete: boolean
  cCreateUserCode: string
  cCreateUserName: string
  dCreateTime: string
  cModifyUserCode: string
  cModifyUserName: string
  dModifyTime: string
  cSourceAppType: string
  iStatus: number
  utfs: string
}

export interface CodingSchemeAddDto extends CodingSchemeVo {}

export interface CodingSchemeEditDto extends CodingSchemeVo {}
