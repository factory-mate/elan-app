export interface PolicyVo {
  UID: string
  cPolicyCode: string
  cPolicyName: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
  cPolicyTypeCode: string
  cPolicyTypeName: string
  cPolicyTypeParmer: string
  IsContain: boolean
  IsThis: boolean
  cMemo: string
}

export interface PolicyAddDto extends PolicyVo {
  models: PolicyDetailVo[]
}

export interface PolicyEditDto extends PolicyAddDto {
  models: PolicyDetailVo[]
}

export interface PolicyDetailVo {
  cPolicyCode: string
  cPolicyName: string
  cAuthCode: string
  cAuthName: string
}

export interface AuthListDto extends FullPageDto {
  val?: string
}
