export interface UserPolicyVo {
  UID: string
  utfs: string
  cLoginName: string
  cUserName: string
  cPolicyCode: string
  cPolicyName: string
  cResourcesCode: string
  cCreateUserName: string
  dCreateTime: string
  cMenuName: string
}

export interface UserPolicyAddDto extends UserPolicyVo {}

export interface UserPolicyEditDto extends UserPolicyAddDto {}

export interface UserPolicyBatchAddDto {
  Items: UserPolicyBatchAddItem[]
}

interface UserPolicyBatchAddItem {
  cLoginName: string
  cPolicyCode: string
  cResourcesCode: string
}

export interface UserPolicyBatchAddFormValues {
  cLoginName: string
  cPolicyCode: string
  cResourcesCode: string[]
}
