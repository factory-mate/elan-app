export interface UserPolicyVo {
  UID: string
  utfs: string
  cLoginName: string
  cPolicyCode: string
  cPolicyName: string
  cResourcesCode: string
  cCreateUserName: string
  dCreateTime: string
  cMenuName: string
}

export interface UserPolicyAddDto extends UserPolicyVo {}

export interface UserPolicyEditDto extends UserPolicyAddDto {}
