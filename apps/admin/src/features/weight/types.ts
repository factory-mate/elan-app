export interface WeightVo {
  UID: string
  ScaleQuantity: number
  iErrorQuantity: number
  cMemo: string
  cCreateUserName: string
  dCreateTime: string
  utfs: string
}

export interface WeightAddDto extends WeightVo {}

export interface WeightEditDto extends WeightAddDto {}
