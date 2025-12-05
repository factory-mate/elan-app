export interface StepVo {
  UID: string
  cStepCode: string
  cStepName: string
  cCreateUserName: string
  dCreateTime: string
  isDevice: boolean
  isBussiness: boolean
  utfs: string
}

export interface StepAddDto extends StepVo {}

export interface StepEditDto extends StepAddDto {}
